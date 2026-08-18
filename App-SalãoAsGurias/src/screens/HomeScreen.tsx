import Logo from "@/components/Logo"
import Button from "@/components/Button"
import { ClientBottomNav } from "@/components/BottomNav"
import { SERVICES } from "@/data"
import { formatCurrency } from "@/utils"
import type { Screen } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
}

const FEATURED = SERVICES.slice(0, 4)

export default function HomeScreen({ navigate }: Props) {
  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Hero */}
        <div className="bg-charcoal px-6 pt-10 pb-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #C9B8A8 0%, transparent 60%)" }}
          />
          <div className="relative z-10 flex flex-col items-center text-center">
            <Logo size="lg" className="rounded-2xl mb-4" />
            <p className="font-brand text-4xl text-nude-light mb-1">As Gurias</p>
            <p className="text-nude text-xs tracking-[0.25em] uppercase font-light mb-4">Salão de Beleza</p>
            <p className="text-white/70 text-sm leading-relaxed max-w-[260px]">
              Beleza, elegância e cuidado para você se sentir incrível.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 py-6 flex flex-col gap-3">
          <Button onClick={() => navigate("select-services")} variant="primary">
            Agendar horário
          </Button>
          <Button onClick={() => navigate("services")} variant="secondary">
            Conhecer serviços
          </Button>
        </div>

        {/* Sobre nós */}
        <div className="mx-5 mb-5 p-5 bg-card rounded-2xl border border-border">
          <h2 className="text-base font-bold text-charcoal mb-2">Sobre nós</h2>
          <p className="text-sm text-muted leading-relaxed">
            O Salão As Gurias nasceu do sonho de Ana Paula Flores em oferecer um espaço acolhedor onde cada cliente se sente especial. Com dedicação e carinho, trabalhamos para realçar sua beleza natural com serviços de qualidade e atendimento personalizado.
          </p>
        </div>

        {/* Serviços em destaque */}
        <div className="px-5 mb-5">
          <h2 className="text-base font-bold text-charcoal mb-3">Serviços em destaque</h2>
          <div className="grid grid-cols-2 gap-3">
            {FEATURED.map((sv) => (
              <button
                key={sv.id}
                onClick={() => navigate("services")}
                className="bg-card border border-border rounded-2xl p-4 text-left active:opacity-70 transition-opacity"
              >
                <span className="text-2xl">{sv.icon}</span>
                <p className="text-sm font-semibold text-charcoal mt-2">{sv.name}</p>
                <p className="text-nude-dark text-sm font-bold mt-0.5">{formatCurrency(sv.price)}</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate("services")}
            className="w-full mt-3 text-center text-sm text-muted font-semibold py-2 active:opacity-70"
          >
            Ver todos os serviços →
          </button>
        </div>

        {/* Contato */}
        <div className="mx-5 mb-6 p-5 bg-nude-light rounded-2xl">
          <h2 className="text-base font-bold text-charcoal mb-3">Contato & Horários</h2>
          <div className="flex flex-col gap-2 text-sm text-charcoal">
            <div className="flex items-center gap-2">
              <span className="text-base">📍</span>
              <span className="text-muted">Porto Alegre, RS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">🕐</span>
              <div>
                <p className="font-semibold">Terça a Sábado</p>
                <p className="text-muted text-xs">08:30 – 12:00 e 13:30 – 18:00</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: "#25D366", fontSize: "1.1rem" }}>●</span>
              <span className="font-semibold">(51) 99114-4880</span>
            </div>
          </div>
        </div>

        {/* Admin link */}
        <div className="pb-6 text-center">
          <button
            onClick={() => navigate("admin-login")}
            className="text-xs text-muted/60 underline active:opacity-70"
          >
            Área administrativa
          </button>
        </div>
      </div>

      <ClientBottomNav active="home" navigate={navigate} />
    </div>
  )
}
