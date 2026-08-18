import Header from "@/components/Header"
import Button from "@/components/Button"
import { getAllSlots, isSlotAvailable, formatDuration, formatDateShort } from "@/utils"
import type { Screen, Appointment, Service } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  selectedDate: string | null
  selectedTime: string | null
  setSelectedTime: (t: string) => void
  selectedServices: Service[]
  appointments: Appointment[]
}

export default function TimeScreen({ navigate, selectedDate, selectedTime, setSelectedTime, selectedServices, appointments }: Props) {
  const totalDuration = selectedServices.reduce((s, sv) => s + sv.duration, 0)
  const slots = getAllSlots()

  const morning = slots.filter((s) => s < "12:00")
  const afternoon = slots.filter((s) => s >= "13:30")

  const renderSlot = (slot: string) => {
    const available = isSlotAvailable(slot, totalDuration, selectedDate || "", appointments)
    const selected = slot === selectedTime
    return (
      <button
        key={slot}
        onClick={() => available && setSelectedTime(slot)}
        disabled={!available}
        className={`
          py-3 px-2 rounded-xl text-sm font-bold text-center border transition-all
          ${selected ? "bg-charcoal text-white border-charcoal" : ""}
          ${!selected && available ? "bg-card border-border text-charcoal active:bg-nude-light" : ""}
          ${!available ? "bg-bg border-border text-muted/30 cursor-not-allowed line-through" : "cursor-pointer"}
        `}
      >
        {slot}
      </button>
    )
  }

  const noSlots = slots.every((s) => !isSlotAvailable(s, totalDuration, selectedDate || "", appointments))

  return (
    <div className="flex-1 flex flex-col bg-bg overflow-hidden">
      <Header title="Escolha o horário" onBack={() => navigate("date")} />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted">{selectedDate ? formatDateShort(selectedDate) : ""}</p>
          <span className="bg-nude-light text-nude-dark text-xs font-bold px-3 py-1 rounded-full border border-nude">
            Duração: {formatDuration(totalDuration)}
          </span>
        </div>

        {noSlots ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <span className="text-4xl">😔</span>
            <p className="text-charcoal font-semibold text-center">
              Não encontramos horários disponíveis para esta data.
            </p>
            <Button onClick={() => navigate("date")} variant="secondary" fullWidth={false} size="md">
              Escolher outra data
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Manhã · 08:30 – 12:00</p>
              <div className="grid grid-cols-3 gap-2">
                {morning.map(renderSlot)}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Tarde · 13:30 – 18:00</p>
              <div className="grid grid-cols-3 gap-2">
                {afternoon.map(renderSlot)}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="px-5 py-5">
        <Button onClick={() => navigate("client-data")} disabled={!selectedTime}>
          Continuar
        </Button>
      </div>
    </div>
  )
}
