import React, { useState } from 'react'
import { X, User, LogOut, RotateCcw, ShieldCheck, Mail, Key, Check } from 'lucide-react'
import { useAuthContext } from '../../contexts/useAuthContext'
import { getOnboardingProfile } from '../../services/onboardingService'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onReOnboard: () => void
  onOpenApiKeyModal: () => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onReOnboard,
  onOpenApiKeyModal,
}) => {
  const { user, isGuest, signOut, updateName } = useAuthContext()
  const onboardingProfile = getOnboardingProfile()

  const [name, setName] = useState(user?.name || '')
  const [isSaved, setIsSaved] = useState(false)

  if (!isOpen) return null

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      updateName(name.trim())
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  const handleSignOut = () => {
    signOut()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AirIQ Account & Preferences</h3>
              <p className="text-[11px] text-slate-400">
                Manage your identity, household calibrations, and AI keys.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                {(user?.name || 'G').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{user?.name || 'Guest User'}</span>
                  {isGuest && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-950/60 text-amber-300 border border-amber-800/50">
                      Guest Session
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3 h-3" />
                  <span>{user?.email || 'Local browser session'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Name Form */}
          <form onSubmit={handleSaveName} className="flex gap-2 pt-2 border-t border-slate-800/80">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{isSaved ? 'Saved' : 'Update'}</span>
            </button>
          </form>
        </div>

        {/* Calibrated Demographics Preview */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Active CleanAir Calibration</span>
          </div>
          <div className="text-xs text-slate-300">
            Location: <strong className="text-white">{onboardingProfile.location?.name || 'Delhi'}</strong> • Members:{' '}
            <strong className="text-white">{onboardingProfile.members.length}</strong> • Daily Commute:{' '}
            <strong className="text-white">{onboardingProfile.lifestyle.dailyCommuteKm} km</strong>
          </div>
          <p className="text-[11px] text-slate-400">
            If your family setup, location, or health status has changed, you can run the 6-step Duolingo wizard again.
          </p>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => {
              onClose()
              onReOnboard()
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Re-run 6-Step Onboarding</span>
          </button>

          <button
            onClick={() => {
              onClose()
              onOpenApiKeyModal()
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>Configure Gemini Key</span>
          </button>
        </div>

        {/* Sign Out Button */}
        <div className="pt-2 border-t border-slate-850 flex items-center justify-between">
          <button
            onClick={handleSignOut}
            className="py-2 px-3 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
