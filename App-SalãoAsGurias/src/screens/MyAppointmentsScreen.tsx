import Header from "@/components/Header"
import Button from "@/components/Button"
import StatusBadge from "@/components/StatusBadge"
import { ClientBottomNav } from "@/components/BottomNav"
import { formatCurrency, formatDateShort } from "@/utils"
import type { Screen, Appointment } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  appointments: Appointment[]
  setSelectedAppointmentId: (id: string) => void
  clientName: string
}

export default function MyAppointmentsScreen({ navigate, appointments, setSelectedAppointmentId, clientName }: Props) {
  const today = new Date().toISOString().split("T")[0]
  const myAppts = appointments.filter((a) => !clientName || a.clientName.toLowerCase().includes(clientName.toLowerCase().slice(0, 3)) || true)

  const upcoming = myAppts
    .filter((a) => a.date >= today && a.status !== "cancelled" && a.status !== "completed")
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))

  const history = myAppts
    .filter((a) => a.date < today || a.status === "cancelled" || a.status === "completed")
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))

  const openDetail = (id: string) => {
    setSelectedAppointmentId(id)
    navigate("appointment-detail")
  }

  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header title="Meus agendamentos" onBack={() => navigate("home")} />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-4">

        {/* Próximos */}
        <h2 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Próximos</h2>
        {upcoming.length === 0 ? (
          <div className="flex flex-col items-center py-10 gap-3">
            <span className="text-4xl">📅</span>
            <p className="text-muted text-sm text-center">Você ainda não possui agendamentos.</p>
            <Button onClick={() => navigate("select-services")} variant="secondary" fullWidth={false} size="md">
              Agendar horário
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-6">
            {upcoming.map((a) => (
              <AppointmentCard key={a.id} appt={a} onClick={() => openDetail(a.id)} />
            ))}
          </div>
        )}

        {/* Histórico */}
        {history.length > 0 && (
          <>
            <h2 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Histórico</h2>
            <div className="flex flex-col gap-3">
              {history.map((a) => (
                <AppointmentCard key={a.id} appt={a} onClick={() => openDetail(a.id)} />
              ))}
            </div>
          </>
        )}
      </div>
      <ClientBottomNav active="appointments" navigate={navigate} />
    </div>
  )
}

function AppointmentCard({ appt, onClick }: { appt: Appointment; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border rounded-2xl px-4 py-4 text-left w-full active:opacity-70 transition-opacity"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-charcoal text-sm">
            {appt.services.map((s) => s.name).join(" + ")}
          </p>
          <p className="text-muted text-xs mt-0.5">
            {formatDateShort(appt.date)} às {appt.time}
          </p>
        </div>
        <StatusBadge status={appt.status} />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-muted text-xs">{appt.clientName}</span>
        <span className="font-bold text-charcoal text-sm">{formatCurrency(appt.total)}</span>
      </div>
    </button>
  )
}
