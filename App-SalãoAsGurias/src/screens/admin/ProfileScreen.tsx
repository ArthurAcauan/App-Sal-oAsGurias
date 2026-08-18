import Header from "@/components/Header"
import { AdminBottomNav } from "@/components/BottomNav"
import Logo from "@/components/Logo"
import type { Screen } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  onLogout: () => void
}

export default function AdminProfileScreen({ navigate, onLogout }: Props) {
  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header title="Perfil" />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-8 flex flex-col items-center gap-4">
        <Logo size="md" className="rounded-2xl" />
        <div className="text-center">
          <p className="font-bold text-charcoal text-lg">Ana Paula Flores</p>
          <p className="text-muted text-sm">Proprietária · As Gurias</p>
        </div>
        <div className="w-full bg-card border border-border rounded-2xl overflow-hidden mt-2">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-xs text-muted">E-mail</p>
            <p className="text-charcoal font-semibold text-sm mt-0.5">ana@asgurias.com.br</p>
          </div>
          <div className="px-5 py-4 border-b border-border">
            <p className="text-xs text-muted">Telefone</p>
            <p className="text-charcoal font-semibold text-sm mt-0.5">(51) 99114-4880</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-xs text-muted">Horário de atendimento</p>
            <p className="text-charcoal font-semibold text-sm mt-0.5">Terça a Sábado, 08:30 – 18:00</p>
          </div>
        </div>
        <button
          onClick={() => { onLogout(); navigate("home") }}
          className="mt-4 px-8 py-3 bg-[#FEE2E2] text-[#C0392B] font-semibold rounded-2xl text-sm active:opacity-70"
        >
          Sair da área administrativa
        </button>
      </div>
      <AdminBottomNav active="profile" navigate={navigate} />
    </div>
  )
}
