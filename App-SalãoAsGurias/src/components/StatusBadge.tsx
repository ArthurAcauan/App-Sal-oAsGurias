import type { AppointmentStatus } from "@/types"

interface StatusBadgeProps {
  status: AppointmentStatus
  size?: "sm" | "md"
}

const config: Record<AppointmentStatus, { label: string; bg: string; text: string }> = {
  pending: { label: "Pendente", bg: "#FEF3C7", text: "#D4970A" },
  confirmed: { label: "Confirmado", bg: "#D1FAE5", text: "#2D7D52" },
  completed: { label: "Concluído", bg: "#F3F4F6", text: "#6B7280" },
  cancelled: { label: "Cancelado", bg: "#FEE2E2", text: "#C0392B" },
}

export default function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const { label, bg, text } = config[status]
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3.5 py-1 text-sm"}`}
      style={{ backgroundColor: bg, color: text }}
    >
      {label}
    </span>
  )
}
