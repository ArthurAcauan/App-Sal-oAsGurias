import Header from "@/components/Header"
import Button from "@/components/Button"
import { isBefore24h } from "@/utils"
import type { Screen, Appointment } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  appointment: Appointment | null
  onConfirmCancel: () => void
  isAdmin?: boolean
}

export default function CancelScreen({ navigate, appointment, onConfirmCancel, isAdmin }: Props) {
  if (!appointment) {
    navigate(isAdmin ? "admin-dashboard" : "my-appointments")
    return null
  }

  const hasFee = isBefore24h(appointment.date, appointment.time)
  const backScreen = isAdmin ? "admin-detail" : "appointment-detail"

  const handleConfirm = () => {
    onConfirmCancel()
    navigate(isAdmin ? "admin-dashboard" : "my-appointments")
  }

  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header title="Cancelar agendamento" onBack={() => navigate(backScreen)} />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5">

        {/* Política */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-4">
          <h2 className="font-bold text-charcoal mb-3">Política de cancelamento</h2>
          <div className="flex flex-col gap-3 text-sm text-charcoal leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-[#2D7D52] font-bold flex-shrink-0">✓</span>
              <p>Cancelamentos com <strong>24 horas ou mais</strong> de antecedência não possuem multa.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#C0392B] font-bold flex-shrink-0">!</span>
              <p>Cancelamentos com <strong>menos de 24 horas</strong> de antecedência possuem multa de <strong>R$ 20,00</strong>.</p>
            </div>
          </div>
        </div>

        {/* Alerta de multa */}
        {hasFee && (
          <div className="bg-[#FEE2E2] border border-[#C0392B]/30 rounded-2xl px-4 py-4 flex items-start gap-3 mb-4">
            <span className="text-[#C0392B] text-xl flex-shrink-0">⚠️</span>
            <div>
              <p className="text-[#C0392B] font-bold text-sm">Este cancelamento possui multa de R$ 20,00</p>
              <p className="text-[#C0392B]/80 text-xs mt-0.5">
                O agendamento está dentro das 24 horas de antecedência.
              </p>
            </div>
          </div>
        )}

        {/* Info do agendamento */}
        <div className="bg-nude-light border border-nude rounded-2xl px-4 py-3 text-sm text-charcoal">
          <p className="font-semibold">{appointment.services.map((s) => s.name).join(" + ")}</p>
          <p className="text-muted mt-0.5">{appointment.date.split("-").reverse().join("/")} às {appointment.time}</p>
        </div>
      </div>

      <div className="px-5 py-5 flex flex-col gap-3">
        <Button onClick={handleConfirm} variant="danger">
          Confirmar cancelamento
        </Button>
        <Button onClick={() => navigate(backScreen)} variant="ghost">
          Voltar
        </Button>
      </div>
    </div>
  )
}
