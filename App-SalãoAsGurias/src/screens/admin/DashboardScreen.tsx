import { useState } from "react"
import Header from "@/components/Header"
import StatusBadge from "@/components/StatusBadge"
import { AdminBottomNav } from "@/components/BottomNav"
import { formatCurrency, formatDuration, toDateStr } from "@/utils"
import type { Screen, Appointment } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  appointments: Appointment[]
  setSelectedAppointmentId: (id: string) => void
  onLogout: () => void
}

export default function AdminDashboardScreen({ navigate, appointments, setSelectedAppointmentId, onLogout }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [viewDate, setViewDate] = useState(today)

  const dateStr = toDateStr(viewDate)
  const isToday = dateStr === toDateStr(new Date())

  const prevDay = () => {
    const d = new Date(viewDate)
    d.setDate(d.getDate() - 1)
    setViewDate(d)
  }
  const nextDay = () => {
    const d = new Date(viewDate)
    d.setDate(d.getDate() + 1)
    setViewDate(d)
  }

  const dayAppts = appointments
    .filter((a) => a.date === dateStr && a.status !== "cancelled")
    .sort((a, b) => a.time.localeCompare(b.time))

  const pending = appointments.filter((a) => a.status === "pending")

  const openDetail = (id: string) => {
    setSelectedAppointmentId(id)
    navigate("admin-detail")
  }

  const formatViewDate = () => {
    return viewDate.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" })
  }

  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header
        title="Agenda"
        right={
          <button onClick={onLogout} className="text-xs text-muted font-semibold active:opacity-70">
            Sair
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-4 pb-4">

        {/* Pending alert */}
        {pending.length > 0 && (
          <div className="bg-[#FEF3C7] border border-[#D4970A]/30 rounded-2xl px-4 py-3 flex items-center gap-3 mb-4">
            <span className="text-[#D4970A] text-xl">🔔</span>
            <div className="flex-1">
              <p className="text-charcoal font-semibold text-sm">
                {pending.length} {pending.length === 1 ? "solicitação pendente" : "solicitações pendentes"}
              </p>
            </div>
          </div>
        )}

        {/* Day nav */}
        <div className="flex items-center justify-between bg-card border border-border rounded-2xl px-4 py-3 mb-4">
          <button onClick={prevDay} className="w-8 h-8 flex items-center justify-center rounded-full active:bg-nude-light">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="text-center">
            <p className="font-bold text-charcoal text-sm capitalize">{isToday ? "Hoje" : formatViewDate()}</p>
            <p className="text-muted text-xs capitalize">{formatViewDate()}</p>
          </div>
          <button onClick={nextDay} className="w-8 h-8 flex items-center justify-center rounded-full active:bg-nude-light">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Count */}
        {dayAppts.length > 0 && (
          <p className="text-xs text-muted mb-3">
            <span className="font-bold text-charcoal">{dayAppts.length}</span> {dayAppts.length === 1 ? "atendimento" : "atendimentos"}
          </p>
        )}

        {/* Morning */}
        <AgendaSection
          label="Manhã · 08:30 – 12:00"
          appts={dayAppts.filter((a) => a.time < "12:00")}
          onOpen={openDetail}
        />

        {/* Afternoon */}
        <AgendaSection
          label="Tarde · 13:30 – 18:00"
          appts={dayAppts.filter((a) => a.time >= "13:30")}
          onOpen={openDetail}
        />

        {dayAppts.length === 0 && (
          <div className="flex flex-col items-center py-12 gap-2">
            <span className="text-4xl">✨</span>
            <p className="text-muted text-sm text-center">Nenhum atendimento para este dia.</p>
          </div>
        )}

        {/* All pending */}
        {pending.length > 0 && (
          <>
            <h2 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 mt-4">Aguardando aprovação</h2>
            <div className="flex flex-col gap-2">
              {pending.map((a) => (
                <button
                  key={a.id}
                  onClick={() => openDetail(a.id)}
                  className="bg-card border border-border rounded-2xl px-4 py-3.5 text-left w-full active:opacity-70"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-charcoal text-sm">{a.clientName}</p>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="text-muted text-xs">
                    {a.date.split("-").reverse().join("/")} às {a.time} · {a.services.map((s) => s.name).join(" + ")}
                  </p>
                  <p className="text-charcoal font-bold text-sm mt-1">{formatCurrency(a.total)}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <AdminBottomNav active="dashboard" navigate={navigate} />
    </div>
  )
}

function AgendaSection({ label, appts, onOpen }: {
  label: string
  appts: Appointment[]
  onOpen: (id: string) => void
}) {
  if (appts.length === 0) return null
  return (
    <div className="mb-4">
      <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">{label}</p>
      <div className="flex flex-col gap-2">
        {appts.map((a) => (
          <button
            key={a.id}
            onClick={() => onOpen(a.id)}
            className="bg-card border border-border rounded-2xl px-4 py-3.5 text-left w-full active:opacity-70"
          >
            <div className="flex items-center gap-3">
              <div className="text-center flex-shrink-0">
                <p className="font-bold text-charcoal text-base leading-tight">{a.time}</p>
                <p className="text-muted text-xs">{formatDuration(a.totalDuration)}</p>
              </div>
              <div className="w-px h-10 bg-border flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-charcoal text-sm truncate">{a.clientName}</p>
                <p className="text-muted text-xs truncate">{a.services.map((s) => s.name).join(" + ")}</p>
              </div>
              <StatusBadge status={a.status} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
