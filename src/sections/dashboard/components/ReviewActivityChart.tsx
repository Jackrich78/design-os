import type { ReviewActivity } from '@/../product/sections/dashboard/types'

interface ReviewActivityChartProps {
  reviewActivity: ReviewActivity[]
}

export function ReviewActivityChart({ reviewActivity }: ReviewActivityChartProps) {
  // Get max count for scaling
  const maxCount = Math.max(...reviewActivity.map(a => a.count), 1)

  // Show last 14 days for better mobile display
  const recentActivity = reviewActivity.slice(-14)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Review Activity
      </h3>

      <div className="flex items-end justify-between gap-1 h-32">
        {recentActivity.map((activity, index) => {
          const height = maxCount > 0 ? (activity.count / maxCount) * 100 : 0
          const date = new Date(activity.date)
          const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' })[0]

          return (
            <div key={activity.date} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full flex items-end justify-center h-24">
                <div
                  className="w-full max-w-[32px] bg-gradient-to-t from-violet-400 to-sky-400 dark:from-violet-500 dark:to-sky-500 rounded-t-md transition-all duration-300 group-hover:from-violet-500 group-hover:to-sky-500 relative"
                  style={{ height: `${height}%` }}
                >
                  {activity.count > 0 && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {activity.count}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {dayLabel}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last 14 days · {reviewActivity.slice(-14).reduce((sum, a) => sum + a.count, 0)} total reviews
        </p>
      </div>
    </div>
  )
}
