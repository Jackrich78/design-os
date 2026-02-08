interface UserMenuProps {
  name: string
  avatarUrl?: string
  onLogout?: () => void
  onSync?: () => void
}

export function UserMenu({ name, avatarUrl, onLogout, onSync }: UserMenuProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{name}</p>
      </div>
      <div className="flex gap-2">
        {onSync && (
          <button
            onClick={onSync}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-sky-600 transition-colors hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950"
          >
            Sync
          </button>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Log out
          </button>
        )}
      </div>
    </div>
  )
}
