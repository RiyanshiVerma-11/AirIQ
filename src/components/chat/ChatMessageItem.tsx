import React from 'react'
import { User, Bot } from 'lucide-react'
import type { ChatMessage } from '../../hooks/useGeminiChat'

interface ChatMessageItemProps {
  message: ChatMessage
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
          isUser
            ? 'bg-blue-600'
            : 'bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-md shadow-cyan-500/20'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Bubble */}
      <div
        className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
          isUser
            ? 'bg-blue-600 text-white font-medium'
            : 'bg-slate-950/80 border border-slate-800 text-slate-200 shadow-lg'
        }`}
      >
        <div className="whitespace-pre-wrap space-y-2">
          {message.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h4 key={i} className="text-sm font-bold text-cyan-300 mt-2 mb-1">
                  {paragraph.replace('### ', '')}
                </h4>
              )
            }
            if (paragraph.startsWith('#### ')) {
              return (
                <h5 key={i} className="text-xs font-bold text-indigo-300 mt-2 mb-0.5">
                  {paragraph.replace('#### ', '')}
                </h5>
              )
            }
            return <p key={i}>{paragraph}</p>
          })}
        </div>

        <div className="mt-2 text-[10px] text-right text-slate-400 opacity-70">
          {message.timestamp}
        </div>
      </div>
    </div>
  )
}
