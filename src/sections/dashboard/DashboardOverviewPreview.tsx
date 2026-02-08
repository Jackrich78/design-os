import data from '@/../product/sections/dashboard/data.json'
import { DueCardsBanner } from './components/DueCardsBanner'
import { StatsRow } from './components/StatsRow'
import { ReviewActivityChart } from './components/ReviewActivityChart'
import { WeakCardsList } from './components/WeakCardsList'

export default function DashboardOverviewPreview() {
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
            dueCardsSummary={data.dueCardsSummary}
            onStartPractice={() => console.log('Start practice')}
          />
        </div>

        {/* Stats row */}
        <div className="mb-6">
          <StatsRow stats={data.dashboardStats} />
        </div>

        {/* Review activity chart */}
        <div className="mb-6">
          <ReviewActivityChart reviewActivity={data.reviewActivity} />
        </div>

        {/* Weak cards section */}
        <div>
          <WeakCardsList
            weakCards={data.weakCards}
            decks={data.decks}
            onReviewCard={(id) => console.log('Review card:', id)}
          />
        </div>
      </div>
    </div>
  )
}
