import { useState, useCallback } from 'react'
import type { CommunityChallenge, CommunityReport } from '../types'
import {
  getCommunityChallenges,
  getCommunityReports,
  saveCommunityChallenges,
  saveCommunityReports,
} from '../services/communityService'

export function useCommunityData() {
  const [reports, setReports] = useState<CommunityReport[]>(getCommunityReports)
  const [challenges, setChallenges] = useState<CommunityChallenge[]>(getCommunityChallenges)

  const upvoteReport = useCallback((reportId: string) => {
    setReports((prev) => {
      const updated = prev.map((r) => (r.id === reportId ? { ...r, upvotes: r.upvotes + 1 } : r))
      saveCommunityReports(updated)
      return updated
    })
  }, [])

  const addReport = useCallback(
    (newReport: Omit<CommunityReport, 'id' | 'timestamp' | 'status' | 'upvotes'>) => {
      const report: CommunityReport = {
        ...newReport,
        id: `rep-${Date.now()}`,
        timestamp: 'Just now',
        status: 'reported',
        upvotes: 1,
      }
      setReports((prev) => {
        const updated = [report, ...prev]
        saveCommunityReports(updated)
        return updated
      })
    },
    []
  )

  const toggleChallengeParticipation = useCallback((challengeId: string) => {
    setChallenges((prev) => {
      const updated = prev.map((c) => {
        if (c.id === challengeId) {
          const joined = !c.joined
          return {
            ...c,
            joined,
            participantsCount: joined ? c.participantsCount + 1 : c.participantsCount - 1,
            currentAvertedPM25Kg: joined ? c.currentAvertedPM25Kg + 2.5 : c.currentAvertedPM25Kg - 2.5,
          }
        }
        return c
      })
      saveCommunityChallenges(updated)
      return updated
    })
  }, [])

  return {
    reports,
    challenges,
    upvoteReport,
    addReport,
    toggleChallengeParticipation,
  }
}
