import type { Deck } from '@/../product/sections/deck-management/types'

interface DeckCardProps {
  deck: Deck
  onSelect?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function DeckCard({ deck, onSelect, onEdit, onDelete }: DeckCardProps) {
  // Derive mastery percentage for visual indicator
  const totalMastery = deck.mastery.new + deck.mastery.learning + deck.mastery.reviewing + deck.mastery.mastered
  const masteredPercentage = totalMastery > 0 ? Math.round((deck.mastery.mastered / totalMastery) * 100) : 0

  return (
    <button
      onClick={onSelect}
      className="w-full bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100 dark:border-slate-700 text-left group"
    >
      {/* Header: Color swatch + Name */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
            style={{ backgroundColor: deck.color }}
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg truncate">
              {deck.name}
            </h3>
            {deck.description && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {deck.description}
              </p>
            )}
          </div>
        </div>

        {/* Default badge */}
        {deck.isDefault && (
          <span className="px-2 py-1 text-xs font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full flex-shrink-0">
            Default
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-900 dark:text-slate-100 font-semibold">
            {deck.cardCount}
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            {deck.cardCount === 1 ? 'card' : 'cards'}
          </span>
        </div>

        {deck.cardCount > 0 && (
          <>
            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />

            <div className="flex items-center gap-1.5">
              <span className="text-slate-900 dark:text-slate-100 font-semibold">
                {deck.dueCount}
              </span>
              <span className="text-slate-500 dark:text-slate-400">due</span>
            </div>

            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />

            {/* Confidence indicator */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1">
                <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-violet-500 rounded-full transition-all duration-300"
                    style={{ width: `${deck.confidence}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {deck.confidence}%
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mastery breakdown - only show if cards exist */}
      {deck.cardCount > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              {deck.mastery.new > 0 && (
                <div
                  className="h-full bg-slate-400 dark:bg-slate-500"
                  style={{ width: `${(deck.mastery.new / totalMastery) * 100}%` }}
                />
              )}
              {deck.mastery.learning > 0 && (
                <div
                  className="h-full bg-sky-400 dark:bg-sky-500"
                  style={{ width: `${(deck.mastery.learning / totalMastery) * 100}%` }}
                />
              )}
              {deck.mastery.reviewing > 0 && (
                <div
                  className="h-full bg-violet-400 dark:bg-violet-500"
                  style={{ width: `${(deck.mastery.reviewing / totalMastery) * 100}%` }}
                />
              )}
              {deck.mastery.mastered > 0 && (
                <div
                  className="h-full bg-green-400 dark:bg-green-500"
                  style={{ width: `${(deck.mastery.mastered / totalMastery) * 100}%` }}
                />
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
              <span>{deck.mastery.new} new</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-sky-400 dark:bg-sky-500" />
              <span>{deck.mastery.learning} learning</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-violet-400 dark:bg-violet-500" />
              <span>{deck.mastery.reviewing} reviewing</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 dark:bg-green-500" />
              <span>{deck.mastery.mastered} mastered</span>
            </div>
          </div>
        </div>
      )}
    </button>
  )
}
