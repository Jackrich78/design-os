import type { DueCardsSummary } from '@/../product/sections/dashboard/types'

interface DueCardsBannerProps {
  dueCardsSummary: DueCardsSummary
  onStartPractice?: () => void
}

export function DueCardsBanner({ dueCardsSummary, onStartPractice }: DueCardsBannerProps) {
  if (dueCardsSummary.totalDue === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
          <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">All caught up! No cards due today.</span>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={onStartPractice}
      className="w-full bg-gradient-to-br from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 text-left group"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">Due Today</p>
          <p className="text-white text-3xl font-bold">
            {dueCardsSummary.totalDue} {dueCardsSummary.totalDue === 1 ? 'card' : 'cards'}
          </p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>

      {/* Deck breakdown */}
      <div className="flex flex-wrap gap-2">
        {dueCardsSummary.byDeck.map(deck => (
          <div
            key={deck.deckId}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: deck.deckColor }}
            />
            <span className="text-white text-sm font-medium">{deck.deckName}</span>
            <span className="text-white/60 text-sm">· {deck.dueCount}</span>
          </div>
        ))}
      </div>
    </button>
  )
}
