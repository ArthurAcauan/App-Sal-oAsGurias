import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

const variants = {
  primary: "bg-charcoal text-white active:opacity-80",
  secondary: "bg-nude-light text-charcoal border border-nude active:opacity-80",
  ghost: "bg-transparent text-charcoal border border-border active:opacity-70",
  danger: "bg-[#C0392B] text-white active:opacity-80",
}

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3.5 text-base",
  lg: "px-6 py-4 text-base",
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "lg",
  disabled = false,
  fullWidth = true,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        rounded-2xl font-semibold transition-opacity
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
