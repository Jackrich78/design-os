import type { WeakCard, Deck } from '@/../product/sections/dashboard/types'

interface WeakCardsListProps {
  weakCards: WeakCard[]
  decks: Deck[]
  onReviewCard?: (cardId: string) => void
}

export function WeakCardsList({ weakCards, decks, onReviewCard }: WeakCardsListProps) {
  if (weakCards.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            No weak cards! Keep up the great work.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Cards Needing Practice
      </h3>

      <div className="space-y-3">
        {weakCards.map(card => {
          const deck = decks.find(d => d.id === card.deckId)

          return (
            <button
              key={card.id}
              onClick={() => onReviewCard?.(card.id)}
              className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-left group"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 dark:text-slate-100 font-medium mb-1 truncate">
                    {card.front}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm truncate">
                    {card.back}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  {deck && (
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: deck.color }}
                    />
                  )}
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {card.confidence}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>{card.lapses} {card.lapses === 1 ? 'lapse' : 'lapses'}</span>
                <span>·</span>
                <span>{card.correctCount}/{card.reviewCount} correct</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
