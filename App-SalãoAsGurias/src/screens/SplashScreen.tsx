import { useEffect } from "react"
import Logo from "@/components/Logo"
import type { Screen } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
}

export default function SplashScreen({ navigate }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigate("home"), 2500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-charcoal relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 20%, #C9B8A8 0%, transparent 60%), radial-gradient(circle at 80% 80%, #C9B8A8 0%, transparent 50%)",
        }}
      />
      <div className="flex flex-col items-center gap-3 relative z-10">
        <Logo size="xl" className="rounded-2xl" />
        <div className="text-center mt-2">
          <p className="font-brand text-5xl text-nude-light leading-tight">As Gurias</p>
          <p className="text-nude text-sm font-light tracking-[0.3em] uppercase mt-1">Agenda</p>
        </div>
      </div>
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-nude animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-nude opacity-60 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-nude opacity-30 animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  )
}
