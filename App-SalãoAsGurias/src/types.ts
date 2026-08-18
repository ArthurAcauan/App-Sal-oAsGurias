export type Screen =
  | "splash"
  | "home"
  | "services"
  | "select-services"
  | "date"
  | "time"
  | "client-data"
  | "review"
  | "confirmation"
  | "my-appointments"
  | "appointment-detail"
  | "cancel-appointment"
  | "admin-login"
  | "admin-dashboard"
  | "admin-detail"
  | "profile"
  | "admin-profile"

export interface Service {
  id: string
  name: string
  price: number
  duration: number
  icon: string
}

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled"

export interface Appointment {
  id: string
  clientName: string
  clientPhone: string
  services: Service[]
  date: string
  time: string
  status: AppointmentStatus
  subtotal: number
  discount: number
  total: number
  totalDuration: number
  createdAt: string
}

export interface BookingFlow {
  selectedServices: Service[]
  selectedDate: string | null
  selectedTime: string | null
  clientName: string
  clientPhone: string
}
