import type { Screen } from "@/types"

interface ClientNavProps {
  active: "home" | "services" | "appointments" | "profile"
  navigate: (screen: Screen) => void
}

export function ClientBottomNav({ active, navigate }: ClientNavProps) {
  const items = [
    { key: "home" as const, label: "Início", screen: "home" as Screen, icon: HomeIcon },
    { key: "services" as const, label: "Serviços", screen: "services" as Screen, icon: ScissorsIcon },
    { key: "appointments" as const, label: "Agenda", screen: "my-appointments" as Screen, icon: CalendarIcon },
    { key: "profile" as const, label: "Perfil", screen: "profile" as Screen, icon: PersonIcon },
  ]
  return (
    <div className="border-t border-border bg-card flex safe-pb">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = item.key === active
        return (
          <button
            key={item.key}
            onClick={() => navigate(item.screen)}
            className="flex-1 flex flex-col items-center py-3 gap-1 active:opacity-70"
          >
            <Icon active={isActive} />
            <span className={`text-[10px] font-semibold ${isActive ? "text-charcoal" : "text-muted"}`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

interface AdminNavProps {
  active: "dashboard" | "appointments" | "profile"
  navigate: (screen: Screen) => void
}

export function AdminBottomNav({ active, navigate }: AdminNavProps) {
  const items = [
    { key: "dashboard" as const, label: "Agenda", screen: "admin-dashboard" as Screen, icon: CalendarIcon },
    { key: "appointments" as const, label: "Solicitações", screen: "admin-dashboard" as Screen, icon: ListIcon },
    { key: "profile" as const, label: "Perfil", screen: "admin-profile" as Screen, icon: PersonIcon },
  ]
  return (
    <div className="border-t border-border bg-card flex">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = item.key === active
        return (
          <button
            key={item.key}
            onClick={() => navigate(item.screen)}
            className="flex-1 flex flex-col items-center py-3 gap-1 active:opacity-70"
          >
            <Icon active={isActive} />
            <span className={`text-[10px] font-semibold ${isActive ? "text-charcoal" : "text-muted"}`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#2C2C2C" : "none"} stroke={active ? "#2C2C2C" : "#9B9390"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function ScissorsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#2C2C2C" : "#9B9390"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  )
}

function CalendarIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#2C2C2C" : "#9B9390"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function PersonIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#2C2C2C" : "#9B9390"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#2C2C2C" : "#9B9390"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}
