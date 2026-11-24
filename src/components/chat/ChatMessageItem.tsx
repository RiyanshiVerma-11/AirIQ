import React from 'react'
import { User, Bot } from 'lucide-react'
import type { ChatMessage } from '../../hooks/useGeminiChat'

interface ChatMessageItemProps {
  message: ChatMessage
}

function renderFormattedInlineText(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = []
  // Matches:
  // 1. **bold**
  // 2. `code`
  // 3. *italic*
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g
  const parts = text.split(regex)

  parts.forEach((part, index) => {
    if (!part) return

    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      tokens.push(
        <strong key={index} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      )
    } else if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      tokens.push(
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-[11px]"
        >
          {part.slice(1, -1)}
        </code>
      )
    } else if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      tokens.push(
        <em key={index} className="italic text-slate-300">
          {part.slice(1, -1)}
        </em>
      )
    } else {
      tokens.push(part)
    }
  })

  return tokens
}

function renderMarkdownContent(content: string): React.ReactNode {
  const blocks = content.split('\n\n')

  return (
    <div className="space-y-2.5">
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim()
        if (!trimmed) return null

        // Header 3: ### Title
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={bIdx} className="text-sm font-bold text-cyan-300 pt-1">
              {renderFormattedInlineText(trimmed.replace(/^###\s+/, ''))}
            </h4>
          )
        }

        // Header 4: #### Title
        if (trimmed.startsWith('#### ')) {
          return (
            <h5 key={bIdx} className="text-xs font-bold text-indigo-300 pt-0.5">
              {renderFormattedInlineText(trimmed.replace(/^####\s+/, ''))}
            </h5>
          )
        }

        const lines = trimmed.split('\n')
        const isBulletList = lines.every((l) => /^\s*[*•-]\s+/.test(l))
        const isNumberedList = lines.every((l) => /^\s*\d+\.\s+/.test(l))

        if (isBulletList) {
          return (
            <ul key={bIdx} className="space-y-1.5 pl-1 my-1">
              {lines.map((line, lIdx) => {
                const itemText = line.replace(/^\s*[*•-]\s+/, '')
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">
                      {renderFormattedInlineText(itemText)}
                    </span>
                  </li>
                )
              })}
            </ul>
          )
        }

        if (isNumberedList) {
          return (
            <ol key={bIdx} className="space-y-1.5 pl-1 my-1">
              {lines.map((line, lIdx) => {
                const match = line.match(/^\s*(\d+)\.\s+(.*)$/)
                const num = match ? match[1] : `${lIdx + 1}`
                const itemText = match ? match[2] : line
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="text-[11px] font-bold text-cyan-400 font-mono shrink-0 mt-0.5">
                      {num}.
                    </span>
                    <span className="leading-relaxed">
                      {renderFormattedInlineText(itemText)}
                    </span>
                  </li>
                )
              })}
            </ol>
          )
        }

        // Mixed lines within a block
        return (
          <div key={bIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              if (/^\s*[*•-]\s+/.test(line)) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{renderFormattedInlineText(line.replace(/^\s*[*•-]\s+/, ''))}</span>
                  </div>
                )
              }
              return (
                <p key={lIdx} className="leading-relaxed">
                  {renderFormattedInlineText(line)}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
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
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium shadow-md shadow-blue-900/20'
            : 'bg-slate-900/50 border border-slate-800/60 text-slate-200 shadow-md backdrop-blur-sm'
        }`}
      >
        {renderMarkdownContent(message.content)}

        <div className={`mt-2 text-[10px] text-right ${isUser ? 'text-blue-200' : 'text-slate-500'}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  )
}
