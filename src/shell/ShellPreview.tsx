import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    { label: 'Decks', href: '/decks', icon: 'decks' as const, isActive: true },
    { label: 'Practice', href: '/practice', icon: 'practice' as const },
    { label: 'Upload', href: '/upload', icon: 'upload' as const },
    { label: 'Progress', href: '/progress', icon: 'progress' as const },
    { label: 'Settings', href: '/settings', icon: 'settings' as const },
  ]

  return (
    <AppShell
      navigationItems={navigationItems}
      pageTitle="Flashy"
      onNavigate={(href) => console.log('Navigate to:', href)}
    >
      <div className="py-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            My Decks
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            4 decks &middot; 127 cards
          </p>
        </div>

        <div className="space-y-3">
          {[
            { name: 'B1.1 Phrases', count: 42, color: 'bg-violet-500' },
            { name: 'B1.2 Grammar', count: 35, color: 'bg-sky-500' },
            { name: 'Kitchen Vocabulary', count: 28, color: 'bg-violet-400' },
            { name: 'Travel Essentials', count: 22, color: 'bg-sky-400' },
          ].map((deck) => (
            <div
              key={deck.name}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div className={`h-10 w-10 rounded-lg ${deck.color}`} />
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {deck.name}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {deck.count} cards
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
