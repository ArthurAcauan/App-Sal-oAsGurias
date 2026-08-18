import Button from "@/components/Button"
import StatusBadge from "@/components/StatusBadge"
import { formatCurrency, formatDateShort } from "@/utils"
import type { Screen, Appointment } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  lastAppointment: Appointment | null
}

export default function ConfirmationScreen({ navigate, lastAppointment }: Props) {
  if (!lastAppointment) return null
  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 flex flex-col items-center justify-center py-10">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-charcoal flex items-center justify-center mb-5">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9B8A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-charcoal mb-2">Solicitação enviada!</h1>
        <p className="text-muted text-sm text-center mb-6">
          Seu pedido de agendamento foi enviado para o salão.
        </p>

        {/* Card */}
        <div className="w-full bg-card border border-border rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-brand text-2xl text-charcoal">As Gurias</p>
            <StatusBadge status="pending" size="md" />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Serviços</span>
              <span className="font-semibold text-charcoal text-right max-w-[55%]">
                {lastAppointment.services.map((s) => s.name).join(" + ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Data</span>
              <span className="font-semibold">{formatDateShort(lastAppointment.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Horário</span>
              <span className="font-semibold">{lastAppointment.time}</span>
            </div>
            <div className="h-px bg-border my-1" />
            <div className="flex justify-between font-bold text-charcoal">
              <span>Total</span><span>{formatCurrency(lastAppointment.total)}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted text-center mb-6">
          Acompanhe o status em <strong>Meus Agendamentos</strong>.
        </p>
      </div>

      <div className="px-5 py-5 flex flex-col gap-3">
        <Button onClick={() => navigate("my-appointments")}>
          Ver meus agendamentos
        </Button>
        <Button onClick={() => navigate("home")} variant="ghost">
          Voltar para início
        </Button>
      </div>
    </div>
  )
}
