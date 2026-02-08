import { ArrowLeft } from 'lucide-react'
import { MainNav } from './MainNav'

interface NavigationItem {
  label: string
  href: string
  icon: 'decks' | 'practice' | 'upload' | 'progress' | 'settings'
  isActive?: boolean
}

interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  pageTitle?: string
  showBackButton?: boolean
  hideHeader?: boolean
  hideNav?: boolean
  onNavigate?: (href: string) => void
  onBack?: () => void
}

export function AppShell({
  children,
  navigationItems,
  pageTitle,
  showBackButton = false,
  hideHeader = false,
  hideNav = false,
  onNavigate,
  onBack,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-[&apos;Plus_Jakarta_Sans&apos;,sans-serif] dark:bg-slate-950">
      {!hideHeader && (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
          <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-4">
            {showBackButton && (
              <button
                onClick={onBack}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            {pageTitle && (
              <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {pageTitle}
              </h1>
            )}
          </div>
        </header>
      )}

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24">
        {children}
      </main>

      {!hideNav && (
        <MainNav items={navigationItems} onNavigate={onNavigate} />
      )}
    </div>
  )
}
