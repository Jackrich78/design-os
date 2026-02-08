import type { DeckListProps } from '@/../product/sections/deck-management/types'
import { DeckCard } from './DeckCard'

export function DeckList({
  decks,
  onSelectDeck,
  onCreateDeck,
  onEditDeck,
  onDeleteDeck
}: DeckListProps) {
  // Separate default deck from others
  const defaultDeck = decks.find(d => d.isDefault)
  const otherDecks = decks.filter(d => !d.isDefault)

  return (
    <div className="relative">
      {/* Full-width background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

      <div className="py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            My Decks
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {decks.length === 1
              ? '1 deck'
              : `${decks.length} decks`} · {' '}
            {decks.reduce((sum, deck) => sum + deck.cardCount, 0)} total cards
          </p>
        </div>

        {/* Create new deck button */}
        <button
          onClick={onCreateDeck}
          className="w-full bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-violet-400 dark:hover:border-violet-500 group mb-6"
        >
          <div className="flex items-center justify-center gap-3 text-slate-600 dark:text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium">Create New Deck</span>
          </div>
        </button>

        {/* Empty state - only default deck exists with no cards */}
        {decks.length === 1 && defaultDeck && defaultDeck.cardCount === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 text-center mb-6">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-sky-100 dark:from-violet-900/30 dark:to-sky-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Welcome to Flashy!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Start by uploading a notebook photo or adding cards manually to begin your language learning journey.
              </p>
              <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
                Upload Photo
              </button>
            </div>
          </div>
        )}

        {/* Default deck (always pinned at top) */}
        {defaultDeck && (
          <div className="mb-6">
            <DeckCard
              deck={defaultDeck}
              onSelect={() => onSelectDeck?.(defaultDeck.id)}
              onEdit={() => onEditDeck?.(defaultDeck.id)}
            />
          </div>
        )}

        {/* Other decks */}
        {otherDecks.length > 0 && (
          <div className="space-y-4">
            {otherDecks.map(deck => (
              <DeckCard
                key={deck.id}
                deck={deck}
                onSelect={() => onSelectDeck?.(deck.id)}
                onEdit={() => onEditDeck?.(deck.id)}
                onDelete={() => onDeleteDeck?.(deck.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
