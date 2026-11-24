import React, { useState } from 'react'
import { Key, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react'

interface ApiKeyConfigModalProps {
  isOpen: boolean
  currentKey: string
  currentModel: string
  onClose: () => void
  onSave: (key: string, model: string) => void
  onClear: () => void
  onTest: (key: string) => Promise<{ success: boolean; message: string }>
}

export const ApiKeyConfigModal: React.FC<ApiKeyConfigModalProps> = ({
  isOpen,
  currentKey,
  currentModel,
  onClose,
  onSave,
  onClear,
  onTest,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState(currentKey)
  const [selectedModel, setSelectedModel] = useState(currentModel)
  const [testStatus, setTestStatus] = useState<{
    testing: boolean
    message?: string
    success?: boolean
  } | null>(null)

  if (!isOpen) return null

  const handleTest = async () => {
    if (!apiKeyInput.trim()) {
      setTestStatus({ testing: false, success: false, message: 'Please enter an API key first' })
      return
    }
    setTestStatus({ testing: true })
    const res = await onTest(apiKeyInput.trim())
    setTestStatus({ testing: false, success: res.success, message: res.message })
  }

  const handleSave = () => {
    onSave(apiKeyInput.trim(), selectedModel)
    onClose()
  }

  const handleClear = () => {
    setApiKeyInput('')
    onClear()
    setTestStatus({
      testing: false,
      success: true,
      message: 'API key cleared. Reverted to offline domain intelligence.',
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Configure Google Gemini GenAI</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <p className="text-slate-300 leading-relaxed">
            Connect your <strong>Google Gemini API key</strong> for unlimited, live conversational AI.
            Without an API key, AirIQ operates seamlessly using its built-in aerosol physics & domain intelligence engine.
          </p>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200 block">Gemini API Key:</label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline inline-flex items-center gap-1 text-[11px] pt-0.5"
            >
              <span>Get a free API key from Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200 block">Model Selection:</label>
            <select
              aria-label="Model Selection"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs cursor-pointer"
            >
              <option value="gemini-2.0-flash">Gemini 2.0 Flash (Recommended, ultra-fast)</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep reasoning)</option>
            </select>
          </div>

          {testStatus && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                testStatus.success
                  ? 'border-emerald-600/50 bg-emerald-950/20 text-emerald-300'
                  : 'border-rose-600/50 bg-rose-950/20 text-rose-300'
              }`}
            >
              {testStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <span>{testStatus.message}</span>
            </div>
          )}

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300 block">🔒 Privacy & Storage:</strong>
            Your API key never leaves your browser. It is saved only in your local browser’s localStorage and communicates directly with official Google Gemini endpoints.
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
          >
            Clear Key (Use Offline Mode)
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTest}
              disabled={testStatus?.testing}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              {testStatus?.testing ? 'Testing...' : 'Test Connection'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
