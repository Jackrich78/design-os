import { Layers, GraduationCap, Camera, BarChart, Settings } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: 'decks' | 'practice' | 'upload' | 'progress' | 'settings'
  isActive?: boolean
}

interface MainNavProps {
  items: NavItem[]
  onNavigate?: (href: string) => void
}

const iconMap = {
  decks: Layers,
  practice: GraduationCap,
  upload: Camera,
  progress: BarChart,
  settings: Settings,
}

export function MainNav({ items, onNavigate }: MainNavProps) {
  // Debug logging
  console.log('MainNav iconMap:', iconMap)
  console.log('MainNav items:', items)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-3xl items-center justify-around px-2">
        {items.map((item) => {
          const Icon = iconMap[item.icon]
          console.log(`Icon for ${item.icon}:`, Icon)
          if (!Icon) {
            console.error(`Icon not found for ${item.icon}`)
            return null
          }
          return (
            <button
              key={item.href}
              onClick={() => onNavigate?.(item.href)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 pt-3 text-xs font-medium transition-colors ${
                item.isActive
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={item.isActive ? 2.25 : 1.75} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
