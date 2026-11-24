import React from 'react'

interface QuickPromptsListProps {
  prompts: string[]
  onSelectPrompt: (prompt: string) => void
}

export const QuickPromptsList: React.FC<QuickPromptsListProps> = ({
  prompts,
  onSelectPrompt,
}) => {
  return (
    <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto text-xs">
      <span className="text-[11px] text-slate-400 font-semibold whitespace-nowrap mr-1">
        Suggested:
      </span>
      {prompts.map((prompt, i) => (
        <button
          key={i}
          onClick={() => onSelectPrompt(prompt)}
          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 whitespace-nowrap transition-colors text-[11px] cursor-pointer"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
