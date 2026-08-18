import type { ReactNode } from "react"

interface HeaderProps {
  title: string
  onBack?: () => void
  right?: ReactNode
}

export default function Header({ title, onBack, right }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
      <div className="w-10">
        {onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-nude-light transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        )}
      </div>
      <h1 className="text-base font-semibold text-charcoal flex-1 text-center">{title}</h1>
      <div className="w-10 flex justify-end">{right}</div>
    </div>
  )
}
