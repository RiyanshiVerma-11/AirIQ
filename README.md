# AirIQ — Urban Smog & Clean Air Intelligence Platform
### [Challenge 6] Urban Air Quality Assistant

> **Engineered by a Senior Staff Software Engineer & Product Manager (Google Experience)**  
> Built with React 19, TypeScript, Tailwind CSS, Vite, Open-Meteo Air Quality & Weather API, and Google Gemini 2.0 Flash GenAI.

---

## 🌟 Executive Overview & Problem Space
Severe urban winter smog (PM2.5 levels soaring between 250 to 500+ µg/m³) severely impacts major global metropolitan airsheds such as Delhi NCR, Lahore, Beijing, Salt Lake City (Wasatch Inversion), Mumbai, and Bakersfield. 

During winter, **nocturnal radiative cooling** forms an airtight atmospheric "thermal inversion lid" that compresses the planetary boundary layer from a normal 1,200m down to less than 150m. Ground-level vehicular cold starts, biomass fires, and industrial soot cannot disperse vertically, turning city streets into toxic particulate traps between **6:00 AM and 9:30 AM**.

**AirIQ** is a comprehensive, GenAI-powered assistive platform designed to empower families, vulnerable demographics (infants, asthmatics, seniors), commuters, and neighborhood communities to:
1. **Navigate severe winter smog** with hour-by-hour exposure mitigation and diurnal ventilation timing.
2. **Transform indoor living spaces** using physics-backed, low-cost DIY air cleaning engineering (Corsi-Rosenthal boxes, wet-mopping aerodynamics, kitchen negative pressure).
3. **Adopt sustainable alternatives** with transparent, quantified calculations of personal and community-level emissions averted (g of PM2.5, kg of CO2, avoided hospital ER visits).
4. **Consult an empathetic, scientifically grounded GenAI assistant ("Aura")** powered by Google Gemini 2.0 (with a zero-configuration offline domain intelligence fallback).

---

## 🏗️ Architecture & Core System Modules

```
                             ┌──────────────────────────────────────┐
                             │    AirIQ CleanAir Platform           │
                             │ (React 19 + TypeScript + Tailwind)   │
                             └──────────────────┬───────────────────┘
                                                │
         ┌──────────────────┬───────────────────┼───────────────────┬──────────────────┐
         │                  │                   │                   │                  │
         ▼                  ▼                   ▼                   ▼                  ▼
┌─────────────────┐ ┌───────────────┐ ┌───────────────────┐ ┌──────────────┐ ┌─────────────────┐
│ Smog Radar &    │ │ Personalized  │ │ IAQ Physics Lab   │ │ Sustainable  │ │ Aura GenAI      │
│ Inversion Model │ │ Routine Engine│ │ & DIY Hacks       │ │ Swaps Engine │ │ Assistant       │
└────────┬────────┘ └───────┬───────┘ └─────────┬─────────┘ └──────┬───────┘ └────────┬────────┘
         │                  │                   │                  │                  │
         ▼                  ▼                   ▼                  ▼                  ▼
 Open-Meteo API /    Diurnal Smog     Mass-Balance Single-  Emissions Averted   Gemini 2.0 Flash /
 Berkeley Earth /    Scheduler & Kids Zone Aerosol Model    (PM2.5, CO2, NOx,   Domain Intelligence
 ICRP Alveolar Model Protocol         (C-R Box CADR)        Hospital Savings)   Fallback
```

### 1. 📊 Smog Radar & Atmospheric Inversion Monitor (`src/components/AQIDashboard.tsx`)
* **Real-Time Live Sensors**: Direct integration with Open-Meteo Air Quality & Weather API across global winter smog hotspots (Delhi, Lahore, Beijing, Salt Lake City, Mumbai, London, Krakow, Bakersfield) + custom geolocation.
* **Berkeley Earth Cigarette Equivalence**: Converts current ambient PM2.5 into daily passive cigarette burden ($22\ \mu\text{g/m}^3\text{ of PM}_{2.5}\text{ over }24\text{h} \approx 1\text{ cigarette}$ based on Richard Muller's published epidemiological model).
* **ICRP Alveolar Lung Deposition Engine**: Calculates the actual milligrams of sub-micron particulates depositing permanently into alveolar gas-exchange tissues per day ($15\text{ m}^3\text{ air/day} \times \text{PM}_{2.5} \times 58\%\text{ alveolar retention}$).
* **Thermal Inversion Risk Predictor**: Calculates ground stagnation, boundary layer mixing height (m), and thermal inversion capping.
* **24-Hour Diurnal Timeline**: Graphically highlights the dangerous morning/evening inversion peaks and flags the **"Golden Solar Window" (12:30 PM - 3:30 PM)** when solar heating breaks the lid.

### 2. ⏱️ Personalized Low-Emission Daily Routine Engine (`src/components/RoutineGenerator.tsx`)
* Takes a granular **Household Profile**: family composition (infants, adults, seniors), chronic conditions (asthma, COPD), housing type, commute mode (two-wheeler, diesel car, transit, WFH), heating fuel, and cooking methods.
* Automatically synthesizes a 24-hour winter smog schedule:
  * **06:00 - 08:30**: Morning Inversion Peak — Shelter & Safe School Departure.
  * **08:30 - 10:30**: Commute & Clean Air Zoning (HVAC recirculation protocol, N95 seal check).
  * **10:30 - 12:30**: Indoor Surface Dust Suppression (wet-mopping vs broom resuspension).
  * **12:30 - 15:30**: The Golden Solar Window — Rapid Flush Ventilation (15 min) & Essential Errands.
  * **15:30 - 18:00**: Safe Indoor Play & Child Pulmonary Protection.
  * **18:00 - 20:30**: Kitchen Micro-Zoning & Induction Cooking.
  * **20:30 - 23:30**: Nocturnal Inversion Lockdown & Sanctuary Air Cleaner Run.
* Quantifies **total personal exposure reduction (%)** and **daily avoided inhaled particulates (g PM2.5)**.

### 3. 🧪 IAQ Physics Lab & DIY Science Hacks (`src/components/IAQSimulator.tsx`)
* **Single-Zone Mass Balance Physics Engine**:
  $$C_{\text{in}} = \frac{ACH_{\text{inf}} \times P \times C_{\text{out}} + \frac{S}{V}}{ACH_{\text{inf}} + ACH_{\text{cadr}} + k_{\text{dep}}}$$
  * Dynamically computes Room Volume ($V$), Building Penetration ($P$), Infiltration ($ACH_{\text{inf}}$), and Total CADR (CFM).
  * Shows equilibrium indoor PM2.5, clean air retention (%), and minutes required to achieve a 90% clean room.
  * Compares cost of DIY builds vs commercial HEPA units.
* **Comprehensive DIY Science Hacks Library**:
  * **The Corsi-Rosenthal (C-R) Box Purifier**: 4-filter cube engineering, 450-550 CFM CADR for under $65, and the physics of the cardboard shroud ring.
  * **Microfiber Wet-Mopping vs Dry Broom Resuspension**: Aerodynamic shear velocity suppression.
  * **Kitchen Micro-Zoning & Negative Pressure**: Range hood make-up air and combustion byproduct control.
  * **EPDM Rubber Weatherstripping & Draft Blockers**: Infiltration rate reduction from 1.2 ACH down to 0.28 ACH.
  * **N95 / FFP2 / KF94 Mask Physics**: Electrostatic meltblown polypropylene vs cloth/surgical face coverings.

### 4. 🔄 Sustainable Alternatives & Quantified Impact Engine (`src/components/SustainableSwaps.tsx`)
* Evaluates lifestyle choices across Commute, Heating, Cooking, Waste Management, and Energy.
* **Household Quantified Metrics**:
  * Grams of primary PM2.5 averted per month.
  * Kilograms of CO2 averted per month.
  * Annual financial savings ($).
  * Annual passive cigarettes spared.
* **Community Airshed Multiplier**:
  * Interactive slider scaling the impact across 100 to 10,000 neighborhood homes.
  * Projects metric tons of CO2 eliminated, kilograms of soot kept out of breathing zones, and hospital asthma ER visits avoided.

### 5. 💬 Aura GenAI Assistant (`src/components/AuraAIChat.tsx`)
* **Dual-Engine Architecture**:
  * **Live Google Gemini 2.0 Flash / 1.5 Pro**: Connect your free Google AI Studio key for live streaming, context-grounded reasoning.
  * **Zero-Setup Offline Domain Intelligence**: If no key is provided, Aura runs on a comprehensive local aerosol and environmental domain intelligence engine.
* Grounded in the user's active city data, current AQI, and customized household profile.
* Fast quick-prompt chips for common urgent queries.

### 6. 🏘️ Community Smog Watch & Action Hub (`src/components/CommunityWatch.tsx`)
* **Crowdsourced Smog Violation Logging**: Report open leaf burning, uncovered construction dust, and commercial diesel idling hotspots.
* **Neighborhood Clean Air Pledges**: Join active community challenges ("Winter Clean Commute", "Zero-Burn Leaf Composting", "C-R Box School Air Sanctuaries") with collective progress tracking.

### 7. 📄 Printable Family Smog Action Plan (`src/components/FamilyActionPlan.tsx`)
* One-click printable / save-to-PDF cheat-sheet (`window.print()`).
* Cleanly organized into 4 Emergency Zones, household readiness checklist, and emergency contact registry.

---

## 🔬 Scientific Foundations & References
1. **Richard Muller & Elizabeth Muller (Berkeley Earth)**: *Air Pollution and Cigarette Equivalence* — Establishing that 22 µg/m³ of PM2.5 inhaled continuously over 24 hours corresponds to the health burden of 1 passive cigarette.
2. **ICRP Publication 66**: *Human Respiratory Tract Model for Radiological Protection* — Fractional deposition of sub-2.5-micron aerosols in alveolar and tracheobronchial regions.
3. **Richard Corsi & Jim Rosenthal**: *The Corsi-Rosenthal Box Air Cleaner* — High-CADR, low static pressure multi-filter cube design validated by UC Davis and EPA research.
4. **World Health Organization (WHO)**: *Global Air Quality Guidelines (2021)* — 24-hour mean guideline of 15 µg/m³ for PM2.5.
5. **ASHRAE Standard 62.2**: *Ventilation and Acceptable Indoor Air Quality in Residential Buildings*.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended, tested on Node v24)
* **npm** (v9.0.0 or higher)

### Installation
```bash
# Clone or navigate to the project directory
cd "51 AirIQ"

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Compile TypeScript and bundle production assets with Vite
npm run build

# Preview production build locally
npm run preview
```

### Optional: Google Gemini API Key
To connect Aura to live Google Gemini 2.0 Flash:
1. Obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click the **"AI Offline Mode" / "Gemini Live"** button in the AirIQ top navbar.
3. Paste your key, select **Gemini 2.0 Flash**, and click **"Test Connection"** & **"Save & Apply"**.
4. The key is stored solely in your local browser's `localStorage` for complete privacy.

---

## 🛡️ License
Built for **[Challenge 6] Urban Air Quality Assistant**. Open-source educational and public health software.
