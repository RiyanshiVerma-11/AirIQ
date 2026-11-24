import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, Trash2 } from 'lucide-react'
import type { AirQualityData, HouseholdProfile } from '../types'
import { useGeminiChat } from '../hooks/useGeminiChat'
import { AURA_PERSONAS, type AuraPersona } from '../services/geminiService'
import { ChatMessageItem } from './chat/ChatMessageItem'
import { QuickPromptsList } from './chat/QuickPromptsList'
import { ApiKeyConfigModal } from './chat/ApiKeyConfigModal'

interface AuraAIChatProps {
  airQualityData: AirQualityData
  profile: HouseholdProfile
  isKeyModalOpen: boolean
  onCloseKeyModal: () => void
  onKeyUpdated: () => void
}

const PERSONA_PROMPTS: Record<AuraPersona, string[]> = {
  general: [
    'My child is coughing at night during this smog alert, what should I do?',
    'How do I build a Corsi-Rosenthal box step by step?',
    'Why is morning smog (6-9 AM) 3x more toxic than midday?',
    'Do indoor houseplants filter PM2.5 or is that a myth?',
    'How do I stop kitchen frying smoke from polluting my living room?',
  ],
  pediatric: [
    'How do I protect my infant’s developing lungs during 400+ AQI?',
    'What is the emergency triage protocol for child asthma attacks in smog?',
    'Should my school-age child wear an N95 or KF94 mask to school?',
    'How do I create an airtight clean-air micro-zone around a crib?',
  ],
  engineering: [
    'Calculate CADR and CFM requirements for a 250 sq. ft. bedroom.',
    'Why does adding a cardboard fan shroud increase clean airflow by 25%?',
    'Can I use MERV-14 instead of MERV-13, or will motor backpressure spike?',
    'What is the pressure drop across 4 pleated filters vs single HEPA?',
  ],
  commute: [
    'How much PM2.5 does in-cabin car AC recirculation block?',
    'What is the best departure window to avoid the morning inversion layer?',
    'How to properly seal an N95 respirator around facial hair or glasses?',
    'How much toxic particulate do I avoid by taking the electric metro vs scooter?',
  ],
  policy: [
    'How do I report illegal open leaf burning in my neighborhood?',
    'What are the legal particulate standards under WHO vs EPA vs NAAQS?',
    'How can our resident association (RWA) enforce dust suppression at construction sites?',
    'What are the emergency GRAP / smog alert stages in major metropolitan areas?',
  ],
}

export const AuraAIChat: React.FC<AuraAIChatProps> = ({
  airQualityData,
  profile,
  isKeyModalOpen,
  onCloseKeyModal,
  onKeyUpdated,
}) => {
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    isLoading,
    hasApiKey,
    activePersona,
    setActivePersona,
    sendMessage,
    clearMessages,
    saveApiKey,
    removeApiKey,
    testKey,
    currentKey,
    currentModel,
  } = useGeminiChat(airQualityData, profile)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = (text?: string) => {
    const msg = text || inputText
    if (!msg.trim()) return
    sendMessage(msg)
    setInputText('')
  }

  const handleSaveKey = (key: string, model: string) => {
    saveApiKey(key, model)
    onKeyUpdated()
  }

  const handleClearKey = () => {
    removeApiKey()
    onKeyUpdated()
  }

  return (
    <div className="space-y-4">
      {/* Chat Container Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl flex flex-col h-[750px] overflow-hidden">
        {/* Chat Header Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-white">Aura CleanAir AI</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-slate-800 text-cyan-300 border border-slate-700">
                    {hasApiKey ? 'Gemini 2.0 Live' : 'Domain Intelligence'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Grounded in {airQualityData.location.name} (AQI {airQualityData.aqi}) & your household profile
                </p>
              </div>
            </div>

            <button
              onClick={clearMessages}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="Reset conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>

          {/* Persona Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
            <span className="text-[11px] text-slate-400 font-semibold shrink-0 mr-1">Role:</span>
            {AURA_PERSONAS.map((p) => {
              const isSelected = activePersona === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(p.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                  title={p.subtitle}
                >
                  <span>{p.icon}</span>
                  <span>{p.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Message History Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => (
            <ChatMessageItem key={msg.id} message={msg} />
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-xl mr-auto">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center shrink-0 text-white">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="rounded-2xl p-4 bg-slate-950 border border-slate-800 text-slate-300 text-xs flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-150" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-300" />
                </div>
                <span>Aura is calculating atmospheric & respiratory recommendations...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <QuickPromptsList
          prompts={PERSONA_PROMPTS[activePersona] || PERSONA_PROMPTS.general}
          onSelectPrompt={(p) => handleSend(p)}
        />

        {/* Message Input Box */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Aura about severe smog protection, IAQ hacks, or sustainable routines..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-cyan-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* API Key Modal */}
      <ApiKeyConfigModal
        isOpen={isKeyModalOpen}
        currentKey={currentKey}
        currentModel={currentModel}
        onClose={onCloseKeyModal}
        onSave={handleSaveKey}
        onClear={handleClearKey}
        onTest={testKey}
      />
    </div>
  )
}
