import { useState, useCallback } from "react"
import type { Screen, Service, Appointment, BookingFlow } from "./types"
import { INITIAL_APPOINTMENTS } from "./data"
import { calcBooking, calcDuration } from "./utils"

import SplashScreen from "./screens/SplashScreen"
import HomeScreen from "./screens/HomeScreen"
import ServicesScreen from "./screens/ServicesScreen"
import SelectServicesScreen from "./screens/SelectServicesScreen"
import DateScreen from "./screens/DateScreen"
import TimeScreen from "./screens/TimeScreen"
import ClientDataScreen from "./screens/ClientDataScreen"
import ReviewScreen from "./screens/ReviewScreen"
import ConfirmationScreen from "./screens/ConfirmationScreen"
import MyAppointmentsScreen from "./screens/MyAppointmentsScreen"
import AppointmentDetailScreen from "./screens/AppointmentDetailScreen"
import CancelScreen from "./screens/CancelScreen"
import ProfileScreen from "./screens/ProfileScreen"

import AdminLoginScreen from "./screens/admin/LoginScreen"
import AdminDashboardScreen from "./screens/admin/DashboardScreen"
import AdminProfileScreen from "./screens/admin/ProfileScreen"

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS)
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [lastConfirmedId, setLastConfirmedId] = useState<string | null>(null)

  const [booking, setBooking] = useState<BookingFlow>({
    selectedServices: [],
    selectedDate: null,
    selectedTime: null,
    clientName: "",
    clientPhone: "",
  })

  const navigate = useCallback((s: Screen) => setScreen(s), [])

  const selectedAppointment = appointments.find((a) => a.id === selectedAppointmentId) ?? null
  const lastAppointment = appointments.find((a) => a.id === lastConfirmedId) ?? null

  const handleConfirmBooking = () => {
    const { subtotal, discount, total } = calcBooking(booking.selectedServices)
    const totalDuration = calcDuration(booking.selectedServices)
    const newAppt: Appointment = {
      id: `apt-${Date.now()}`,
      clientName: booking.clientName,
      clientPhone: booking.clientPhone,
      services: booking.selectedServices,
      date: booking.selectedDate!,
      time: booking.selectedTime!,
      status: "pending",
      subtotal,
      discount,
      total,
      totalDuration,
      createdAt: new Date().toISOString(),
    }
    setAppointments((prev) => [...prev, newAppt])
    setLastConfirmedId(newAppt.id)
    setBooking({ selectedServices: [], selectedDate: null, selectedTime: null, clientName: "", clientPhone: "" })
  }

  const updateStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  const handleApprove = () => {
    if (selectedAppointmentId) {
      updateStatus(selectedAppointmentId, "confirmed")
      navigate("admin-dashboard")
    }
  }

  const handleComplete = () => {
    if (selectedAppointmentId) {
      updateStatus(selectedAppointmentId, "completed")
      navigate("admin-dashboard")
    }
  }

  const handleCancelConfirm = () => {
    if (selectedAppointmentId) updateStatus(selectedAppointmentId, "cancelled")
  }

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen navigate={navigate} />

      case "home":
        return <HomeScreen navigate={navigate} />

      case "services":
        return <ServicesScreen navigate={navigate} />

      case "select-services":
        return (
          <SelectServicesScreen
            navigate={navigate}
            selectedServices={booking.selectedServices}
            setSelectedServices={(svs: Service[]) => setBooking((b) => ({ ...b, selectedServices: svs }))}
          />
        )

      case "date":
        return (
          <DateScreen
            navigate={navigate}
            selectedDate={booking.selectedDate}
            setSelectedDate={(d) => setBooking((b) => ({ ...b, selectedDate: d, selectedTime: null }))}
          />
        )

      case "time":
        return (
          <TimeScreen
            navigate={navigate}
            selectedDate={booking.selectedDate}
            selectedTime={booking.selectedTime}
            setSelectedTime={(t) => setBooking((b) => ({ ...b, selectedTime: t }))}
            selectedServices={booking.selectedServices}
            appointments={appointments}
          />
        )

      case "client-data":
        return (
          <ClientDataScreen
            navigate={navigate}
            selectedServices={booking.selectedServices}
            selectedDate={booking.selectedDate}
            selectedTime={booking.selectedTime}
            clientName={booking.clientName}
            setClientName={(v) => setBooking((b) => ({ ...b, clientName: v }))}
            clientPhone={booking.clientPhone}
            setClientPhone={(v) => setBooking((b) => ({ ...b, clientPhone: v }))}
          />
        )

      case "review":
        return (
          <ReviewScreen
            navigate={navigate}
            selectedServices={booking.selectedServices}
            selectedDate={booking.selectedDate}
            selectedTime={booking.selectedTime}
            clientName={booking.clientName}
            clientPhone={booking.clientPhone}
            onConfirm={handleConfirmBooking}
          />
        )

      case "confirmation":
        return <ConfirmationScreen navigate={navigate} lastAppointment={lastAppointment} />

      case "my-appointments":
        return (
          <MyAppointmentsScreen
            navigate={navigate}
            appointments={appointments}
            setSelectedAppointmentId={setSelectedAppointmentId}
            clientName={booking.clientName}
          />
        )

      case "appointment-detail":
        return (
          <AppointmentDetailScreen
            navigate={navigate}
            appointment={selectedAppointment}
            onCancel={() => navigate("cancel-appointment")}
          />
        )

      case "cancel-appointment":
        return (
          <CancelScreen
            navigate={navigate}
            appointment={selectedAppointment}
            onConfirmCancel={handleCancelConfirm}
            isAdmin={isAdmin}
          />
        )

      case "profile":
        return <ProfileScreen navigate={navigate} />

      // Admin screens
      case "admin-login":
        return <AdminLoginScreen navigate={navigate} onLogin={() => setIsAdmin(true)} />

      case "admin-dashboard":
        return (
          <AdminDashboardScreen
            navigate={navigate}
            appointments={appointments}
            setSelectedAppointmentId={setSelectedAppointmentId}
            onLogout={() => { setIsAdmin(false); navigate("home") }}
          />
        )

      case "admin-detail":
        return (
          <AppointmentDetailScreen
            navigate={navigate}
            appointment={selectedAppointment}
            onCancel={() => navigate("cancel-appointment")}
            isAdmin
            onApprove={handleApprove}
            onComplete={handleComplete}
          />
        )

      case "admin-profile":
        return (
          <AdminProfileScreen
            navigate={navigate}
            onLogout={() => { setIsAdmin(false) }}
          />
        )

      default:
        return <HomeScreen navigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen bg-[#E8E5E2] flex items-start justify-center">
      <div
        className="relative flex flex-col bg-bg overflow-hidden"
        style={{ width: "390px", minHeight: "100svh", maxHeight: "100svh" }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-bg flex-shrink-0">
          <span className="text-[11px] font-bold text-charcoal">
            {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <div className="flex items-center gap-1">
            <svg width="15" height="11" viewBox="0 0 15 11" fill="#2C2C2C">
              <rect x="0" y="7" width="3" height="4" rx="0.5" />
              <rect x="4" y="4.5" width="3" height="6.5" rx="0.5" />
              <rect x="8" y="2" width="3" height="9" rx="0.5" />
              <rect x="12" y="0" width="3" height="11" rx="0.5" />
            </svg>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="#2C2C2C">
              <path d="M8 2.5C10.5 2.5 12.8 3.5 14.4 5.2L15.5 4C13.6 2.1 11 1 8 1 5 1 2.4 2.1 0.5 4L1.6 5.2C3.2 3.5 5.5 2.5 8 2.5Z"/>
              <circle cx="8" cy="9" r="1.5"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#2C2C2C" strokeOpacity="0.35"/>
              <rect x="2" y="2" width="18" height="8" rx="2" fill="#2C2C2C"/>
              <path d="M23 4.5v3a1.5 1.5 0 000-3z" fill="#2C2C2C" fillOpacity="0.4"/>
            </svg>
          </div>
        </div>
        {/* Screen content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {renderScreen()}
        </div>
      </div>
    </div>
  )
}
