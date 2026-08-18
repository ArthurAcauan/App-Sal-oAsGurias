import logoImg from "@/imports/Logo_sal_o.jpg"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizes = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-28 h-28",
  xl: "w-40 h-40",
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  return (
    <img
      src={logoImg}
      alt="As Gurias — Salão de Beleza"
      className={`${sizes[size]} object-contain ${className}`}
    />
  )
}
