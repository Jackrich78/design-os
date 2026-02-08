import { useState } from 'react'
import type { PracticeSetupProps } from '@/../product/sections/practice-session/types'

export function PracticeSetup({
  decks,
  config,
  onSelectDeck,
  onChangeDirection,
  onChangeCardLimit,
  onStart
}: PracticeSetupProps) {
  const [showAllDecks, setShowAllDecks] = useState(false)

  // Sort all decks by due count (selected first, then by due count descending)
  const selectedDeck = decks.find(d => d.id === config.selectedDeckId)
  const otherDecks = decks
    .filter(d => d.id !== config.selectedDeckId)
    .sort((a, b) => b.dueCount - a.dueCount)

  // Maintain consistent order: selected first, then sorted by due count
  const allDecksSorted = selectedDeck ? [selectedDeck, ...otherDecks] : otherDecks
  const limitedDecks = allDecksSorted.slice(0, 3)
  const visibleDecks = showAllDecks ? allDecksSorted : limitedDecks
  const hasMoreDecks = decks.length > 3

  return (
    <div className="relative min-h-screen">
      {/* Full-width background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

      <div className="py-6 pb-24">
        {/* Header - minimal, no subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Practice Session
          </h1>
        </div>

        {/* Deck selection */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
            Choose Deck
          </h2>
          <div className={`space-y-3 ${showAllDecks && decks.length > 6 ? 'max-h-96 overflow-y-auto pr-2' : ''}`}>
            {visibleDecks.map(deck => (
              <button
                key={deck.id}
                onClick={() => onSelectDeck?.(deck.id)}
                className={`w-full bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border-2 transition-all text-left ${
                  config.selectedDeckId === deck.id
                    ? 'border-violet-500 dark:border-violet-400'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: deck.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {deck.name}
                      </p>
                      {deck.description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                          {deck.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {deck.dueCount} due
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {deck.cardCount} total
                      </p>
                    </div>
                    {config.selectedDeckId === deck.id && (
                      <svg className="w-5 h-5 text-violet-500 dark:text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* View all decks link */}
          {hasMoreDecks && (
            <button
              onClick={() => setShowAllDecks(!showAllDecks)}
              className="mt-3 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
            >
              {showAllDecks ? 'Show fewer decks' : `View all decks (${decks.length})`}
            </button>
          )}
        </div>

        {/* Direction toggle */}
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
            Direction
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onChangeDirection?.('es-to-en')}
              className={`py-3 px-4 rounded-xl border-2 transition-all ${
                config.direction === 'es-to-en'
                  ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-500 dark:border-violet-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <p className="font-semibold text-slate-900 dark:text-slate-100 text-center">
                Spanish → English
              </p>
            </button>

            <button
              onClick={() => onChangeDirection?.('en-to-es')}
              className={`py-3 px-4 rounded-xl border-2 transition-all ${
                config.direction === 'en-to-es'
                  ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-500 dark:border-violet-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <p className="font-semibold text-slate-900 dark:text-slate-100 text-center">
                English → Spanish
              </p>
            </button>
          </div>
        </div>

        {/* Card count selector */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
            Number of Cards
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-900 dark:text-slate-100 font-semibold">
                {config.cardLimit} cards
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onChangeCardLimit?.(Math.max(5, config.cardLimit - 5))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  disabled={config.cardLimit <= 5}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={() => onChangeCardLimit?.(Math.min(50, config.cardLimit + 5))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  disabled={config.cardLimit >= 50}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={config.cardLimit}
              onChange={(e) => onChangeCardLimit?.(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
          </div>
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 shadow-2xl z-50">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onStart}
            disabled={!config.selectedDeckId}
            className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Practice Session
          </button>
        </div>
      </div>
    </div>
  )
}
