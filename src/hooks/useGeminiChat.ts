import { useState, useCallback } from 'react'
import type { AirQualityData, HouseholdProfile } from '../types'
import {
  askAuraAssistant,
  getStoredGeminiKey,
  getStoredGeminiModel,
  setStoredGeminiKey,
  setStoredGeminiModel,
  testGeminiAPIKey,
} from '../services/geminiService'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-01',
  role: 'assistant',
  content: `Hello! I am **Aura**, your GenAI Urban Air Quality & Clean Living Specialist.

I am actively tracking ambient smog conditions, atmospheric thermal inversion dynamics, and household aerosol physics.

You can ask me anything about:
* **Emergency cough & asthma mitigation** for children and seniors
* **Building low-cost DIY air cleaners** (Corsi-Rosenthal boxes)
* **Low-emission daily routines** and smart ventilation timing
* **Sustainable home swaps** (induction, heat pumps, anti-burning)

How can I help protect your family or community today?`,
  timestamp: 'Just now',
}

export function useGeminiChat(airQualityData?: AirQualityData, profile?: HouseholdProfile) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(() => !!getStoredGeminiKey())

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev) => [...prev, userMsg])
      setIsLoading(true)

      try {
        const history = messages.map((m) => ({ role: m.role, content: m.content }))
        const responseText = await askAuraAssistant({
          currentAQI: airQualityData,
          householdProfile: profile,
          userMessage: text,
          conversationHistory: history,
        })

        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }

        setMessages((prev) => [...prev, assistantMsg])
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Unable to complete response'
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I encountered an unexpected error: ${errorMsg}. Please try asking again.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
        setMessages((prev) => [...prev, assistantMsg])
      } finally {
        setIsLoading(false)
      }
    },
    [airQualityData, profile, messages, isLoading]
  )

  const clearMessages = useCallback(() => {
    setMessages([INITIAL_WELCOME_MESSAGE])
  }, [])

  const saveApiKey = useCallback((key: string, model: string) => {
    setStoredGeminiKey(key)
    setStoredGeminiModel(model)
    setHasApiKey(!!key.trim())
  }, [])

  const removeApiKey = useCallback(() => {
    setStoredGeminiKey('')
    setHasApiKey(false)
  }, [])

  const testKey = useCallback(async (key: string) => {
    return await testGeminiAPIKey(key)
  }, [])

  return {
    messages,
    isLoading,
    hasApiKey,
    sendMessage,
    clearMessages,
    saveApiKey,
    removeApiKey,
    testKey,
    currentKey: getStoredGeminiKey(),
    currentModel: getStoredGeminiModel(),
  }
}
