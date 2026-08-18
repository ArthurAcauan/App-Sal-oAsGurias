import Header from "@/components/Header"
import Button from "@/components/Button"
import { formatCurrency, formatDuration, formatDateShort, calcBooking, calcDuration } from "@/utils"
import type { Screen, Service } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  selectedServices: Service[]
  selectedDate: string | null
  selectedTime: string | null
  clientName: string
  setClientName: (v: string) => void
  clientPhone: string
  setClientPhone: (v: string) => void
}

export default function ClientDataScreen({
  navigate,
  selectedServices,
  selectedDate,
  selectedTime,
  clientName,
  setClientName,
  clientPhone,
  setClientPhone,
}: Props) {
  const { subtotal, discount, total } = calcBooking(selectedServices)
  const totalDuration = calcDuration(selectedServices)
  const canContinue = clientName.trim().length > 2 && clientPhone.trim().length >= 10

  const formatPhone = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 11)
    if (digits.length <= 2) return `(${digits}`
    if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`
  }

  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header title="Quase pronto!" onBack={() => navigate("time")} />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5">

        {/* Resumo */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-5">
          <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Resumo</h3>
          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Serviços</span>
              <span className="text-charcoal font-semibold text-right max-w-[55%]">
                {selectedServices.map((s) => s.name).join(" + ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Data</span>
              <span className="font-semibold">{selectedDate ? formatDateShort(selectedDate) : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Horário</span>
              <span className="font-semibold">{selectedTime || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Duração aprox.</span>
              <span className="font-semibold">{formatDuration(totalDuration)}</span>
            </div>
            <div className="h-px bg-border my-1" />
            <div className="flex justify-between text-muted">
              <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#2D7D52] font-semibold">
                <span>Desconto 10%</span><span>− {formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-charcoal">
              <span>Total</span><span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Seus dados</h3>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-muted mb-1.5 block">Nome completo</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Maria Silva"
              className="w-full bg-card border border-border rounded-2xl px-4 py-3.5 text-sm text-charcoal placeholder:text-muted/50 outline-none focus:border-charcoal transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted mb-1.5 block">Telefone / WhatsApp</label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(formatPhone(e.target.value))}
              placeholder="(51) 99999-9999"
              className="w-full bg-card border border-border rounded-2xl px-4 py-3.5 text-sm text-charcoal placeholder:text-muted/50 outline-none focus:border-charcoal transition-colors"
            />
          </div>
        </div>
      </div>
      <div className="px-5 py-5">
        <Button onClick={() => navigate("review")} disabled={!canContinue}>
          Revisar agendamento
        </Button>
      </div>
    </div>
  )
}
