import { useState } from 'react'
import type { DeckDetailProps } from '@/../product/sections/deck-management/types'

export function DeckDetail({
  deck,
  cards,
  allDecks,
  onEditCard,
  onMoveCards,
  onEditDeck,
  onDeleteDeck,
  onBack
}: DeckDetailProps) {
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([])
  const [showMovePicker, setShowMovePicker] = useState(false)
  const [showDeckMenu, setShowDeckMenu] = useState(false)

  const isAllSelected = cards.length > 0 && selectedCardIds.length === cards.length
  const isSomeSelected = selectedCardIds.length > 0
  const isSingleSelected = selectedCardIds.length === 1

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedCardIds([])
    } else {
      setSelectedCardIds(cards.map(c => c.id))
    }
  }

  const toggleCard = (cardId: string) => {
    setSelectedCardIds(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    )
  }

  const handleMoveCards = (targetDeckId: string) => {
    onMoveCards?.(selectedCardIds, targetDeckId)
    setSelectedCardIds([])
    setShowMovePicker(false)
  }

  const handleEditCard = () => {
    if (isSingleSelected) {
      onEditCard?.(selectedCardIds[0])
      setSelectedCardIds([])
    }
  }

  // Filter out current deck from move options
  const moveTargets = allDecks.filter(d => d.id !== deck.id)

  return (
    <div className="relative min-h-screen">
      {/* Full-width background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

      <div className="py-6 pb-24">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">All Decks</span>
          </button>

          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex-shrink-0"
              style={{ backgroundColor: deck.color }}
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {deck.name}
              </h1>
              {deck.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {deck.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span>{deck.cardCount} cards</span>
                {deck.dueCount > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-violet-600 dark:text-violet-400 font-medium">
                      {deck.dueCount} due
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDeckMenu(!showDeckMenu)}
                className="p-2 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              {showDeckMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDeckMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                    <button
                      onClick={() => {
                        onEditDeck?.(deck.id)
                        setShowDeckMenu(false)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Deck
                    </button>
                    {!deck.isDefault && (
                      <button
                        onClick={() => {
                          onDeleteDeck?.(deck.id)
                          setShowDeckMenu(false)
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Deck
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Selection toolbar */}
        {cards.length > 0 && (
          <div className="mb-4">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                isAllSelected
                  ? 'bg-violet-600 border-violet-600'
                  : 'border-slate-300 dark:border-slate-600'
              }`}>
                {isAllSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {isSomeSelected ? `${selectedCardIds.length} selected` : 'Select all'}
            </button>
          </div>
        )}

        {/* Empty state */}
        {cards.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-sky-100 dark:from-violet-900/30 dark:to-sky-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                No cards yet
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Upload a photo or add cards manually to start learning.
              </p>
            </div>
          </div>
        )}

        {/* Card list */}
        <div className="space-y-3">
          {cards.map(card => {
            const isSelected = selectedCardIds.includes(card.id)
            const masteryStage =
              card.repetitions === 0 ? 'new' :
              card.interval < 7 ? 'learning' :
              card.interval < 21 ? 'reviewing' : 'mastered'

            const masteryColors = {
              new: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
              learning: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
              reviewing: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
              mastered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
            }

            return (
              <button
                key={card.id}
                onClick={() => toggleCard(card.id)}
                className={`w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border transition-all text-left ${
                  isSelected
                    ? 'border-violet-400 dark:border-violet-500 ring-2 ring-violet-100 dark:ring-violet-900/30'
                    : 'border-slate-100 dark:border-slate-700'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-violet-600 border-violet-600'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            {card.front}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {card.back}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${masteryColors[masteryStage]}`}>
                          {masteryStage}
                        </span>
                      </div>

                      {card.notes && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 bg-slate-50 dark:bg-slate-900/50 rounded px-2 py-1">
                          {card.notes}
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="capitalize">{card.cardType}</span>
                        {card.reviewCount > 0 && (
                          <>
                            <span>•</span>
                            <span>
                              {card.correctCount}/{card.reviewCount} correct
                            </span>
                          </>
                        )}
                        {card.nextReview && (
                          <>
                            <span>•</span>
                            <span>Next: {new Date(card.nextReview).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Sticky bottom action bar (appears when cards selected) */}
      {isSomeSelected && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 shadow-2xl z-50">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <button
              onClick={() => setSelectedCardIds([])}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Clear selection"
            >
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {selectedCardIds.length} selected
            </span>
            <div className="flex-1" />
            {isSingleSelected && (
              <button
                onClick={handleEditCard}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
            <button
              onClick={() => setShowMovePicker(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Move to...
            </button>
          </div>
        </div>
      )}

      {/* Move picker modal (full screen overlay) */}
      {showMovePicker && isSomeSelected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Move {selectedCardIds.length} card{selectedCardIds.length !== 1 ? 's' : ''} to:
              </h3>
              <button
                onClick={() => setShowMovePicker(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-2">
              {moveTargets.map(targetDeck => (
                <button
                  key={targetDeck.id}
                  onClick={() => handleMoveCards(targetDeck.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: targetDeck.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {targetDeck.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {targetDeck.cardCount} cards
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
