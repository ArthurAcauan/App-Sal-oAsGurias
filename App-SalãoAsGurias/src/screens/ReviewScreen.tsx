import Header from "@/components/Header"
import Button from "@/components/Button"
import { formatCurrency, formatDuration, formatDate, calcBooking, calcDuration } from "@/utils"
import type { Screen, Service } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  selectedServices: Service[]
  selectedDate: string | null
  selectedTime: string | null
  clientName: string
  clientPhone: string
  onConfirm: () => void
}

export default function ReviewScreen({
  navigate,
  selectedServices,
  selectedDate,
  selectedTime,
  clientName,
  clientPhone,
  onConfirm,
}: Props) {
  const { subtotal, discount, total } = calcBooking(selectedServices)
  const totalDuration = calcDuration(selectedServices)

  const handleConfirm = () => {
    onConfirm()
    navigate("confirmation")
  }

  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header title="Confira seu agendamento" onBack={() => navigate("client-data")} />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5">

        {/* Card de revisão */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <div className="bg-charcoal px-5 py-4">
            <p className="text-nude-light font-brand text-2xl">As Gurias</p>
            <p className="text-white/60 text-xs mt-0.5">Salão de Beleza · Solicitação de agendamento</p>
          </div>
          <div className="px-5 py-4 flex flex-col gap-3 text-sm">
            <Row label="Cliente" value={clientName} />
            <Row label="Telefone" value={clientPhone} />
            <div className="h-px bg-border" />
            <Row label="Procedimentos" value={selectedServices.map((s) => s.name).join(" + ")} />
            <Row label="Data" value={selectedDate ? formatDate(selectedDate) : "—"} capitalize />
            <Row label="Horário" value={selectedTime || "—"} />
            <Row label="Duração estimada" value={formatDuration(totalDuration)} />
            <div className="h-px bg-border" />
            <Row label="Subtotal" value={formatCurrency(subtotal)} />
            {discount > 0 && (
              <Row label="Desconto 10%" value={`− ${formatCurrency(discount)}`} valueClass="text-[#2D7D52] font-bold" />
            )}
            <Row label="Total" value={formatCurrency(total)} valueClass="font-bold text-charcoal text-base" />
          </div>
        </div>

        {/* Aviso */}
        <div className="bg-[#FEF9EC] border border-[#F59E0B]/30 rounded-2xl px-4 py-3.5 flex items-start gap-3 mb-4">
          <span className="text-[#D4970A] text-xl">⏳</span>
          <p className="text-sm text-charcoal leading-relaxed">
            Seu horário será enviado para <strong>aprovação do salão</strong>. Você receberá a confirmação em breve.
          </p>
        </div>
      </div>

      <div className="px-5 py-5">
        <Button onClick={handleConfirm}>
          Solicitar agendamento
        </Button>
      </div>
    </div>
  )
}

function Row({ label, value, valueClass = "", capitalize = false }: {
  label: string
  value: string
  valueClass?: string
  capitalize?: boolean
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
