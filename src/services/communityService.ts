import { CommunityChallenge, CommunityReport } from '../types'
import {
  INITIAL_COMMUNITY_REPORTS,
  INITIAL_CHALLENGES,
} from '../constants/community'

const LOCAL_STORAGE_REPORTS = 'airiq_community_reports'
const LOCAL_STORAGE_CHALLENGES = 'airiq_community_challenges'

export { INITIAL_COMMUNITY_REPORTS, INITIAL_CHALLENGES }

export function getCommunityReports(): CommunityReport[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REPORTS)
    if (raw) return JSON.parse(raw)
  } catch {
    // fallback
  }
  return INITIAL_COMMUNITY_REPORTS
}

export function saveCommunityReports(reports: CommunityReport[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_REPORTS, JSON.stringify(reports))
  } catch (err) {
    console.error('Failed to save reports to localStorage', err)
  }
}

export function getCommunityChallenges(): CommunityChallenge[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CHALLENGES)
    if (raw) return JSON.parse(raw)
  } catch {
    // fallback
  }
  return INITIAL_CHALLENGES
}

export function saveCommunityChallenges(challenges: CommunityChallenge[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_CHALLENGES, JSON.stringify(challenges))
  } catch (err) {
    console.error('Failed to save challenges to localStorage', err)
  }
}
