import type { DashboardOverviewProps } from '@/../product/sections/dashboard/types'
import { DueCardsBanner } from './DueCardsBanner'
import { StatsRow } from './StatsRow'
import { ReviewActivityChart } from './ReviewActivityChart'

export function DashboardOverview({
  stats,
  dueCardsSummary,
  reviewActivity,
  onStartPractice
}: DashboardOverviewProps) {
  return (
    <div className="relative">
      {/* Full-width background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

      <div className="py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Progress
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your learning journey
          </p>
        </div>

        {/* Due cards banner */}
        <div className="mb-6">
          <DueCardsBanner
            dueCardsSummary={dueCardsSummary}
            onStartPractice={onStartPractice}
          />
        </div>

        {/* Stats row */}
        <div className="mb-6">
          <StatsRow stats={stats} />
        </div>

        {/* Review activity chart */}
        <div className="mb-6">
          <ReviewActivityChart reviewActivity={reviewActivity} />
        </div>
      </div>
    </div>
  )
}
