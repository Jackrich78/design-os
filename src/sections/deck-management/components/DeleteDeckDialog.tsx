import type { DeleteDeckDialogProps } from '@/../product/sections/deck-management/types'

export function DeleteDeckDialog({
  deck,
  onDeleteAndMoveCards,
  onDeleteWithCards,
  onCancel
}: DeleteDeckDialogProps) {
  const hasCards = deck.cardCount > 0

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
          {/* Header with warning icon */}
          <div className="p-6 pb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 text-center mb-2">
              Delete Deck?
            </h2>

            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: deck.color }}
                />
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {deck.name}
                </span>
              </div>
            </div>

            {hasCards ? (
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                This deck contains <span className="font-semibold text-slate-900 dark:text-slate-100">{deck.cardCount} card{deck.cardCount !== 1 ? 's' : ''}</span>.
                What would you like to do with them?
              </p>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                This deck is empty and can be safely deleted.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 pt-2 space-y-3">
            {hasCards && (
              <>
                {/* Primary option: Move cards */}
                <button
                  onClick={() => onDeleteAndMoveCards?.(deck.id)}
                  className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Move Cards & Delete Deck
                </button>

                {/* Destructive option: Delete everything */}
                <button
                  onClick={() => onDeleteWithCards?.(deck.id)}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Deck & All Cards
                </button>
              </>
            )}

            {!hasCards && (
              <button
                onClick={() => onDeleteWithCards?.(deck.id)}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Deck
              </button>
            )}

            {/* Cancel */}
            <button
              onClick={onCancel}
              className="w-full py-3 px-4 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
