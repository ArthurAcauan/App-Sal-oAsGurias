import { useState } from "react"
import Logo from "@/components/Logo"
import Button from "@/components/Button"
import type { Screen } from "@/types"

interface Props {
  navigate: (screen: Screen) => void
  onLogin: () => void
}

export default function AdminLoginScreen({ navigate, onLogin }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = () => {
    if (email === "ana@asgurias.com.br" && password === "gurias123") {
      onLogin()
      navigate("admin-dashboard")
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-charcoal overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 flex flex-col items-center justify-center py-10">
        <Logo size="lg" className="rounded-2xl mb-5" />
        <p className="font-brand text-4xl text-nude-light mb-1">As Gurias</p>
        <p className="text-nude text-xs tracking-[0.25em] uppercase font-light mb-8">Área administrativa</p>

        <div className="w-full flex flex-col gap-3">
          <div>
            <label className="text-nude text-xs font-semibold mb-1.5 block">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(false) }}
              placeholder="ana@asgurias.com.br"
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-nude transition-colors"
            />
          </div>
          <div>
            <label className="text-nude text-xs font-semibold mb-1.5 block">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-nude transition-colors"
            />
          </div>

          {error && (
            <p className="text-[#F87171] text-xs text-center">
              E-mail ou senha incorretos. Tente novamente.
            </p>
          )}

          <div className="mt-2">
            <Button onClick={handleLogin} disabled={!email || !password}>
              Entrar
            </Button>
          </div>
        </div>

        <p className="text-white/20 text-xs text-center mt-6">Demo: ana@asgurias.com.br / gurias123</p>
      </div>

      <div className="pb-6 text-center">
        <button
          onClick={() => navigate("home")}
          className="text-xs text-nude/50 underline active:opacity-70"
        >
          Voltar ao app
        </button>
      </div>
    </div>
  )
}
