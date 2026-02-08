import type { PracticeSummaryProps } from '@/../product/sections/practice-session/types'

export function PracticeSummary({
  summary,
  onDone,
  onRetryProblemCards
}: PracticeSummaryProps) {
  const totalRatings = summary.ratings.again + summary.ratings.hard + summary.ratings.good + summary.ratings.easy
  const successRate = totalRatings > 0
    ? Math.round(((summary.ratings.good + summary.ratings.easy) / totalRatings) * 100)
    : 0

  return (
    <div className="relative">
      {/* Full-width background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

      <div className="py-6">
        {/* Compact header with celebration */}
        <div className="mb-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            Session Complete!
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {summary.totalCards} {summary.totalCards === 1 ? 'card' : 'cards'} · {successRate}% success
          </p>
        </div>

        {/* Ratings breakdown */}
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
            Performance Breakdown
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Again */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border-2 border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Again</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {summary.ratings.again}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-400 dark:bg-slate-500 rounded-full"
                  style={{ width: `${totalRatings > 0 ? (summary.ratings.again / totalRatings) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border-2 border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Hard</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {summary.ratings.hard}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-400 dark:bg-slate-500 rounded-full"
                  style={{ width: `${totalRatings > 0 ? (summary.ratings.hard / totalRatings) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Good */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border-2 border-sky-200 dark:border-sky-900/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-sky-600 dark:text-sky-400">Good</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {summary.ratings.good}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400 dark:bg-sky-500 rounded-full"
                  style={{ width: `${totalRatings > 0 ? (summary.ratings.good / totalRatings) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Easy */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border-2 border-violet-200 dark:border-violet-900/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-violet-600 dark:text-violet-400">Easy</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {summary.ratings.easy}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-400 dark:bg-violet-500 rounded-full"
                  style={{ width: `${totalRatings > 0 ? (summary.ratings.easy / totalRatings) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Done button - primary action */}
        <div className="mb-6">
          <button
            onClick={onDone}
            className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Done
          </button>
        </div>

        {/* Problem cards - secondary content */}
        {summary.problemCards.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
              Cards to Review ({summary.problemCards.length})
            </h2>

            {/* Retry button */}
            {onRetryProblemCards && (
              <button
                onClick={onRetryProblemCards}
                className="w-full mb-4 py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
              >
                Practice These Cards Again
              </button>
            )}

            <div className="space-y-3">
              {summary.problemCards.map(card => (
                <div
                  key={card.cardId}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                        {card.front}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {card.back}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                        card.rating === 'again'
                          ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {card.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
