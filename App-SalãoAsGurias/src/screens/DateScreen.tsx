import { useState } from "react"
import Header from "@/components/Header"
import Button from "@/components/Button"
import { isWorkingDay, toDateStr, formatDate } from "@/utils"
import type { Screen } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  selectedDate: string | null
  setSelectedDate: (d: string) => void
}

const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
const DAYS = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"]

export default function DateScreen({ navigate, selectedDate, setSelectedDate }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const getDateStr = (day: number) => toDateStr(new Date(year, month, day))

  const isPast = (day: number) => new Date(year, month, day) < today
  const isWorking = (day: number) => isWorkingDay(new Date(year, month, day))
  const isSelected = (day: number) => getDateStr(day) === selectedDate
  const isToday = (day: number) => getDateStr(day) === toDateStr(today)

  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header title="Escolha a data" onBack={() => navigate("select-services")} />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5">

        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border active:opacity-70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="font-bold text-charcoal">{MONTHS[month]} {year}</span>
          <button onClick={nextMonth} className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border active:opacity-70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-xs font-bold text-muted py-1">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />
            const past = isPast(day)
            const working = isWorking(day)
            const sel = isSelected(day)
            const tod = isToday(day)
            const available = !past && working

            return (
              <button
                key={day}
                onClick={() => available && setSelectedDate(getDateStr(day))}
                disabled={!available}
                className={`
                  aspect-square flex items-center justify-center rounded-full text-sm font-semibold mx-auto w-9 h-9
                  ${sel ? "bg-charcoal text-white" : ""}
                  ${!sel && tod ? "border-2 border-charcoal text-charcoal" : ""}
                  ${!sel && !tod && available ? "text-charcoal active:bg-nude-light" : ""}
                  ${!available ? "text-muted/40 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                {day}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 justify-center text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-charcoal inline-block" />
            Selecionado
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-muted/20 inline-block" />
            Indisponível
          </span>
        </div>

        {selectedDate && (
          <div className="mt-4 bg-nude-light rounded-2xl px-4 py-3 text-sm text-charcoal font-semibold text-center capitalize">
            {formatDate(selectedDate)}
          </div>
        )}

        <p className="text-xs text-muted text-center mt-3">
          Atendimentos: terça a sábado
        </p>
      </div>
      <div className="px-5 py-5">
        <Button onClick={() => navigate("time")} disabled={!selectedDate}>
          Ver horários
        </Button>
      </div>
    </div>
  )
}
