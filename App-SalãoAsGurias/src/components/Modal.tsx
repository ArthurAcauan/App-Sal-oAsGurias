import type { ReactNode } from "react"

interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  onClose?: () => void
}

export default function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
      <div
        className="w-full max-w-[390px] bg-card rounded-t-3xl px-6 pt-6 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
        <h2 className="text-lg font-bold text-charcoal mb-4">{title}</h2>
        {children}
      </div>
    </div>
  )
}
