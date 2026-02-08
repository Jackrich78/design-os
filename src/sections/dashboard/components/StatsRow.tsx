import type { DashboardStats } from '@/../product/sections/dashboard/types'

interface StatsRowProps {
  stats: DashboardStats
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total Cards</p>
        <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold">{stats.totalCards}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total Reviews</p>
        <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold">{stats.totalReviews}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Streak</p>
          <span className="text-lg">🔥</span>
        </div>
        <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold">{stats.currentStreak} days</p>
      </div>
    </div>
  )
}
