import Header from "@/components/Header"
import Button from "@/components/Button"
import { ClientBottomNav } from "@/components/BottomNav"
import { SERVICES, SPECIAL_EVENTS } from "@/data"
import { formatCurrency, formatDuration } from "@/utils"
import type { Screen } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
}

export default function ServicesScreen({ navigate }: Props) {
  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header title="Nossos Serviços" onBack={() => navigate("home")} />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5">
        <div className="mb-5">
          <Button onClick={() => navigate("select-services")} variant="primary">
            Selecionar serviços
          </Button>
        </div>

        <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">Todos os serviços</h2>
        <div className="flex flex-col gap-2 mb-6">
          {SERVICES.map((sv) => (
            <div
              key={sv.id}
              className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3"
            >
              <span className="text-2xl w-9 text-center">{sv.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-charcoal text-sm">{sv.name}</p>
                <p className="text-muted text-xs mt-0.5">Duração aprox. {formatDuration(sv.duration)}</p>
              </div>
              <p className="font-bold text-charcoal text-sm">{formatCurrency(sv.price)}</p>
            </div>
          ))}
        </div>

        <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">Eventos especiais</h2>
        <div className="flex flex-col gap-2 mb-8">
          {SPECIAL_EVENTS.map((ev) => (
            <div
              key={ev.name}
              className="bg-nude-light border border-nude rounded-2xl px-4 py-3.5 flex items-center gap-3"
            >
              <span className="text-2xl w-9 text-center">{ev.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-charcoal text-sm">{ev.name}</p>
              </div>
              <span className="text-xs font-bold text-nude-dark bg-white/60 px-2.5 py-1 rounded-full border border-nude">
                Sob consulta
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted pb-4">
          Para eventos especiais, entre em contato pelo WhatsApp.
        </p>
      </div>
      <ClientBottomNav active="services" navigate={navigate} />
    </div>
  )
}
