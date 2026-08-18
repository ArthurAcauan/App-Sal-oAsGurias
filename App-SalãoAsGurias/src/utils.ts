import type { Appointment } from "./types"

const MORNING_START = 8 * 60 + 30
const MORNING_END = 12 * 60
const AFTERNOON_START = 13 * 60 + 30
const AFTERNOON_END = 18 * 60

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
}

export function getAllSlots(): string[] {
  const slots: string[] = []
  for (let t = MORNING_START; t <= MORNING_END - 30; t += 30) {
    slots.push(minutesToTime(t))
  }
  for (let t = AFTERNOON_START; t <= AFTERNOON_END - 30; t += 30) {
    slots.push(minutesToTime(t))
  }
  return slots
}

export function isSlotAvailable(
  time: string,
  totalDuration: number,
  dateStr: string,
  appointments: Appointment[]
): boolean {
  const start = timeToMinutes(time)
  const end = start + totalDuration

  const fitsInMorning = start >= MORNING_START && end <= MORNING_END
  const fitsInAfternoon = start >= AFTERNOON_START && end <= AFTERNOON_END

  if (!fitsInMorning && !fitsInAfternoon) return false

  const dayAppointments = appointments.filter(
    (a) => a.date === dateStr && a.status !== "cancelled"
  )

  for (const appt of dayAppointments) {
    const apptStart = timeToMinutes(appt.time)
    const apptEnd = apptStart + appt.totalDuration
    if (start < apptEnd && end > apptStart) return false
  }

  return true
}

export function isWorkingDay(date: Date): boolean {
  const day = date.getDay()
  return day >= 2 && day <= 6
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function formatDateShort(dateStr: string): string {
  const [y, m, d] = dateStr.split("-")
  return `${d}/${m}/${y}`
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}h`
  return `${h}h${m.toString().padStart(2, "0")}`
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function calcBooking(services: { price: number }[]) {
  const subtotal = services.reduce((s, sv) => s + sv.price, 0)
  const hasDiscount = services.length >= 3
  const discount = hasDiscount ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount
  return { subtotal, discount, total }
}

export function calcDuration(services: { duration: number }[]): number {
  return services.reduce((s, sv) => s + sv.duration, 0)
}

export function toDateStr(date: Date): string {
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, "0")
  const d = date.getDate().toString().padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function isBefore24h(dateStr: string, time: string): boolean {
  const [y, mo, d] = dateStr.split("-").map(Number)
  const [h, mi] = time.split(":").map(Number)
  const apptTime = new Date(y, mo - 1, d, h, mi)
  const now = new Date()
  const diff = apptTime.getTime() - now.getTime()
  return diff < 24 * 60 * 60 * 1000
}
