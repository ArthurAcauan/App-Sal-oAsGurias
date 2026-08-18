import Header from "@/components/Header"
import { ClientBottomNav } from "@/components/BottomNav"
import type { Screen } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
}

export default function ProfileScreen({ navigate }: Props) {
  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header title="Perfil" onBack={() => navigate("home")} />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-8 flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-nude-light flex items-center justify-center border border-nude">
          <span className="text-4xl">👤</span>
        </div>
        <p className="text-charcoal font-bold text-lg">Minha conta</p>
        <div className="w-full bg-card border border-border rounded-2xl overflow-hidden">
          {[
            { icon: "📅", label: "Meus agendamentos", screen: "my-appointments" as Screen },
            { icon: "✂️", label: "Serviços", screen: "services" as Screen },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.screen)}
              className="w-full flex items-center gap-4 px-5 py-4 border-b border-border last:border-b-0 active:bg-nude-light text-left"
            >
              <span>{item.icon}</span>
              <span className="text-charcoal font-semibold text-sm">{item.label}</span>
              <span className="ml-auto text-muted">›</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("admin-login")}
          className="text-xs text-muted/60 underline mt-4"
        >
          Área administrativa
        </button>
      </div>
      <ClientBottomNav active="profile" navigate={navigate} />
    </div>
  )
}
