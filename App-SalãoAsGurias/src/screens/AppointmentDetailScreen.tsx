import Header from "@/components/Header"
import Button from "@/components/Button"
import StatusBadge from "@/components/StatusBadge"
import { formatCurrency, formatDuration, formatDate } from "@/utils"
import type { Screen, Appointment } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  appointment: Appointment | null
  onCancel?: () => void
  isAdmin?: boolean
  onApprove?: () => void
  onComplete?: () => void
}

export default function AppointmentDetailScreen({
  navigate,
  appointment,
  onCancel,
  isAdmin,
  onApprove,
  onComplete,
}: Props) {
  if (!appointment) {
    navigate(isAdmin ? "admin-dashboard" : "my-appointments")
    return null
  }

  const backScreen = isAdmin ? "admin-dashboard" : "my-appointments"

  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header
        title={isAdmin ? "Detalhes do agendamento" : "Agendamento"}
        onBack={() => navigate(backScreen)}
      />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5">

        {/* Status + header */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <div className="bg-charcoal px-5 py-4 flex items-center justify-between">
            <p className="font-brand text-2xl text-nude-light">As Gurias</p>
            <StatusBadge status={appointment.status} size="md" />
          </div>
          <div className="px-5 py-4 flex flex-col gap-2.5 text-sm">
            <Row label="Cliente" value={appointment.clientName} />
            <Row label="Telefone" value={appointment.clientPhone} />
            <div className="h-px bg-border" />
            <Row label="Procedimentos" value={appointment.services.map((s) => s.name).join(" + ")} />
            <Row label="Data" value={formatDate(appointment.date)} capitalize />
            <Row label="Horário" value={appointment.time} />
            <Row label="Duração estimada" value={formatDuration(appointment.totalDuration)} />
            <div className="h-px bg-border" />
            <Row label="Subtotal" value={formatCurrency(appointment.subtotal)} />
            {appointment.discount > 0 && (
              <Row
                label="Desconto 10%"
                value={`− ${formatCurrency(appointment.discount)}`}
                valueClass="text-[#2D7D52] font-bold"
              />
            )}
            <Row label="Total" value={formatCurrency(appointment.total)} valueClass="font-bold text-base text-charcoal" />
          </div>
        </div>

        {/* Actions */}
        {isAdmin && appointment.status === "pending" && (
          <div className="flex flex-col gap-3 mb-4">
            <Button onClick={onApprove}>✓ Aprovar agendamento</Button>
            <Button onClick={onCancel} variant="ghost">Cancelar agendamento</Button>
          </div>
        )}
        {isAdmin && appointment.status === "confirmed" && (
          <div className="flex flex-col gap-3 mb-4">
            <Button onClick={onComplete} variant="secondary">Concluir atendimento</Button>
            <Button onClick={onCancel} variant="ghost">Cancelar agendamento</Button>
          </div>
        )}
        {!isAdmin && (appointment.status === "pending" || appointment.status === "confirmed") && (
          <Button
            onClick={() => navigate("cancel-appointment")}
            variant="ghost"
          >
            Cancelar agendamento
          </Button>
        )}
      </div>
    </div>
  )
}

function Row({ label, value, valueClass = "", capitalize = false }: {
  label: string; value: string; valueClass?: string; capitalize?: boolean
}) {
  return (
    <div className="flex justify-between items-start gap-3">
      <span className="text-muted flex-shrink-0">{label}</span>
      <span className={`text-charcoal font-semibold text-right ${capitalize ? "capitalize" : ""} ${valueClass}`}>
        {value}
      </span>
    </div>
  )
}
