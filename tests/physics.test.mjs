import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

// 1. Berkeley Earth Cigarette Equivalence formula
function computeCigarettesEquivalent(pm25) {
  const eq = pm25 / 22
  return Math.max(0, Math.round(eq * 10) / 10)
}

// 2. ICRP Alveolar Lung Deposition model
function computeAlveolarLungDeposition(pm25) {
  const totalInhaledUg = pm25 * 15
  const alveolarDepositedUg = totalInhaledUg * 0.58
  const mgDeposited = alveolarDepositedUg / 1000
  return Math.max(0, Math.round(mgDeposited * 100) / 100)
}

// 3. Thermal Inversion Classifier
function evaluateThermalInversion(windSpeedKmH, humidityPct, currentHour) {
  const isNightOrMorning = currentHour >= 21 || currentHour <= 9
  const isLowWind = windSpeedKmH < 7

  if (isNightOrMorning && isLowWind && humidityPct > 60) {
    return { risk: 'Extreme', boundaryLayerM: 120 }
  }
  if (isNightOrMorning && windSpeedKmH < 12) {
    return { risk: 'High', boundaryLayerM: 250 }
  }
  if (currentHour >= 12 && currentHour <= 16) {
    return { risk: 'Low', boundaryLayerM: 850 }
  }
  return { risk: 'Moderate', boundaryLayerM: 450 }
}

// 4. Single-Zone Mass Balance Physics Simulator
function simulateIAQ({ outdoorPM25, roomLengthM, roomWidthM, roomHeightM, buildingSealingLevel, filtrationMode, purifierCount, indoorSources }) {
  const roomVolumeM3 = Math.max(10, roomLengthM * roomWidthM * roomHeightM)

  let naturalInfiltrationACH = 0.6
  let penetrationFactor = 0.55
  if (buildingSealingLevel === 'drafty') {
    naturalInfiltrationACH = 1.2
    penetrationFactor = 0.75
  } else if (buildingSealingLevel === 'weather_sealed') {
    naturalInfiltrationACH = 0.28
    penetrationFactor = 0.35
  }

  let unitCADR_CFM = 0
  if (filtrationMode === 'diy_corsi_rosenthal_4filter') unitCADR_CFM = 485
  else if (filtrationMode === 'diy_box_fan_merv13') unitCADR_CFM = 220
  else if (filtrationMode === 'hepa_premium') unitCADR_CFM = 310
  else if (filtrationMode === 'hepa_compact') unitCADR_CFM = 140

  const totalCADR_CFM = unitCADR_CFM * purifierCount
  const cadrM3H = totalCADR_CFM * 1.69901
  const filtrationACH = cadrM3H / roomVolumeM3
  const kDepositionRate = 0.15

  let sourceRateUgH = 0
  if (indoorSources?.fryingCooking) sourceRateUgH += 12000
  if (indoorSources?.incenseCandles) sourceRateUgH += 9500
  if (indoorSources?.unventedGasHeater) sourceRateUgH += 4500
  if (indoorSources?.smoking) sourceRateUgH += 28000

  const outdoorInflow = naturalInfiltrationACH * penetrationFactor * outdoorPM25
  const indoorSource = sourceRateUgH / roomVolumeM3
  const totalRemovalACH = naturalInfiltrationACH + filtrationACH + kDepositionRate

  const equilibriumPM25 = Math.max(3, Math.round(((outdoorInflow + indoorSource) / totalRemovalACH) * 10) / 10)
  const reductionFraction = Math.max(0, 1 - equilibriumPM25 / (outdoorPM25 || 1))
  const cleanAirRetentionPercent = Math.round(reductionFraction * 100)

  return {
    roomVolumeM3,
    airChangesPerHourACH: Math.round(totalRemovalACH * 10) / 10,
    equilibriumIndoorPM25: equilibriumPM25,
    cleanAirRetentionPercent,
  }
}

describe('AirIQ Scientific Domain Physics & Model Tests', () => {
  test('Berkeley Earth Cigarette Equivalence: 22 ug/m3 PM2.5 over 24h = 1 cigarette', () => {
    assert.equal(computeCigarettesEquivalent(22), 1.0)
    assert.equal(computeCigarettesEquivalent(220), 10.0)
    assert.equal(computeCigarettesEquivalent(340), 15.5)
    assert.equal(computeCigarettesEquivalent(0), 0)
  })

  test('ICRP Alveolar Deposition Model: 58% retention of 15 m3/day inhalation', () => {
    // For 100 ug/m3: 100 * 15 = 1500 ug inhaled. 1500 * 0.58 = 870 ug = 0.87 mg
    assert.equal(computeAlveolarLungDeposition(100), 0.87)
    // For 300 ug/m3: 300 * 15 * 0.58 / 1000 = 2.61 mg
    assert.equal(computeAlveolarLungDeposition(300), 2.61)
  })

  test('Thermal Inversion Boundary Layer Dynamics', () => {
    // Night cold stagnation (07:00, 3 km/h wind, 80% humidity) -> Extreme risk
    const morningTrap = evaluateThermalInversion(3.0, 80, 7)
    assert.equal(morningTrap.risk, 'Extreme')
    assert.equal(morningTrap.boundaryLayerM, 120)

    // Midday solar convective lift (14:00) -> Low risk, mixing height lifts
    const solarLift = evaluateThermalInversion(6.0, 50, 14)
    assert.equal(solarLift.risk, 'Low')
    assert.equal(solarLift.boundaryLayerM, 850)
  })

  test('Single-Zone Mass Balance: Corsi-Rosenthal Box Achieves >90% Particulate Reduction', () => {
    const rawOutdoorPM25 = 350 // Severe winter smog
    const simResult = simulateIAQ({
      outdoorPM25: rawOutdoorPM25,
      roomLengthM: 5.0,
      roomWidthM: 4.0,
      roomHeightM: 2.8,
      buildingSealingLevel: 'standard',
      filtrationMode: 'diy_corsi_rosenthal_4filter',
      purifierCount: 1,
      indoorSources: { fryingCooking: false, incenseCandles: false, unventedGasHeater: false, smoking: false },
    })

    // Steady state indoor PM2.5 should drop from 350 to < 15 ug/m3 (WHO compliant!)
    assert.ok(simResult.equilibriumIndoorPM25 <= 15, `Indoor PM2.5 ${simResult.equilibriumIndoorPM25} was not <= 15`)
    assert.ok(simResult.cleanAirRetentionPercent >= 90, `Clean air retention ${simResult.cleanAirRetentionPercent}% was not >= 90%`)
    assert.ok(simResult.airChangesPerHourACH >= 12, `Total ACH ${simResult.airChangesPerHourACH} should exceed 12`)
  })

  test('Building Sealing Comparison: Weather-Sealed cuts particulate infiltration vs Drafty', () => {
    const drafty = simulateIAQ({
      outdoorPM25: 200,
      roomLengthM: 4.0,
      roomWidthM: 4.0,
      roomHeightM: 2.5,
      buildingSealingLevel: 'drafty',
      filtrationMode: 'none',
      purifierCount: 0,
      indoorSources: {},
    })

    const weatherSealed = simulateIAQ({
      outdoorPM25: 200,
      roomLengthM: 4.0,
      roomWidthM: 4.0,
      roomHeightM: 2.5,
      buildingSealingLevel: 'weather_sealed',
      filtrationMode: 'none',
      purifierCount: 0,
      indoorSources: {},
    })

    // Weather sealing should drastically reduce equilibrium unmitigated PM2.5 penetration
    assert.ok(weatherSealed.equilibriumIndoorPM25 < drafty.equilibriumIndoorPM25)
  })
})
