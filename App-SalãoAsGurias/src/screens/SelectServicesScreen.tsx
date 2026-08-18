import Header from "@/components/Header"
import Button from "@/components/Button"
import { SERVICES } from "@/data"
import { formatCurrency, formatDuration, calcBooking, calcDuration } from "@/utils"
import type { Screen, Service } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  selectedServices: Service[]
  setSelectedServices: (svs: Service[]) => void
}

export default function SelectServicesScreen({ navigate, selectedServices, setSelectedServices }: Props) {
  const toggle = (sv: Service) => {
    if (selectedServices.find((s) => s.id === sv.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== sv.id))
    } else {
      setSelectedServices([...selectedServices, sv])
    }
  }

  const totalDuration = calcDuration(selectedServices)
  const { subtotal, discount, total } = calcBooking(selectedServices)
  const hasDiscount = selectedServices.length >= 3

  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header title="O que você deseja?" onBack={() => navigate("home")} />

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-4 pb-2">
        <p className="text-sm text-muted mb-4">Selecione um ou mais procedimentos.</p>
        <div className="flex flex-col gap-2">
          {SERVICES.map((sv) => {
            const selected = !!selectedServices.find((s) => s.id === sv.id)
            return (
              <button
                key={sv.id}
                onClick={() => toggle(sv)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all text-left ${
                  selected
                    ? "bg-charcoal border-charcoal"
                    : "bg-card border-border active:opacity-70"
                }`}
              >
                <span className="text-xl w-8 text-center">{sv.icon}</span>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${selected ? "text-white" : "text-charcoal"}`}>{sv.name}</p>
                  <p className={`text-xs mt-0.5 ${selected ? "text-nude-light" : "text-muted"}`}>
                    {formatDuration(sv.duration)}
                  </p>
                </div>
                <p className={`font-bold text-sm ${selected ? "text-nude-light" : "text-charcoal"}`}>
                  {formatCurrency(sv.price)}
                </p>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selected ? "bg-nude border-nude" : "border-border"
                }`}>
                  {selected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#2C2C2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Summary bar */}
      <div className="px-5 pt-3 pb-5 bg-card border-t border-border">
        {hasDiscount && (
          <div className="bg-[#D1FAE5] rounded-xl px-4 py-2.5 mb-3 flex items-center gap-2">
            <span className="text-[#2D7D52] text-base">🎉</span>
            <span className="text-[#2D7D52] text-sm font-bold">Você ganhou 10% de desconto!</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-muted mb-1">
          <span>{selectedServices.length} {selectedServices.length === 1 ? "serviço" : "serviços"}</span>
          {totalDuration > 0 && <span>Duração: {formatDuration(totalDuration)}</span>}
        </div>
        {hasDiscount ? (
          <div className="flex flex-col gap-0.5 mb-3 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#2D7D52] font-semibold">
              <span>Desconto 10%</span><span>− {formatCurrency(discount)}</span>
            </div>
            <div className="flex justify-between text-charcoal font-bold text-base mt-0.5">
              <span>Total</span><span>{formatCurrency(total)}</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-between text-charcoal font-bold text-base mb-3">
            <span>Total</span>
            <span>{selectedServices.length > 0 ? formatCurrency(total) : "—"}</span>
          </div>
        )}
        <Button
          onClick={() => navigate("date")}
          disabled={selectedServices.length === 0}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
