interface LogoIconProps {
  size?: number
  className?: string
}

export default function LogoIcon({ size = 40, className }: LogoIconProps) {
  const h = size * 1.15

  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hexagon background */}
      <path
        d="M50 4L95 28V76L50 100L5 76V28L50 4Z"
        fill="#0D2218"
        stroke="#A8FF78"
        strokeWidth="3"
      />

      {/* Bar 1 — lime */}
      <rect x="18" y="58" width="13" height="26" rx="1.5" fill="#A8FF78" />
      {/* Bar 2 — lime */}
      <rect x="35" y="46" width="13" height="38" rx="1.5" fill="#A8FF78" />
      {/* Bar 3 — lime */}
      <rect x="52" y="36" width="13" height="48" rx="1.5" fill="#A8FF78" />
      {/* Bar 4 — teal (plus haute, couleur distincte) */}
      <rect x="69" y="22" width="13" height="62" rx="1.5" fill="#27AE60" />

      {/* Ligne horizontale dorée */}
      <line x1="14" y1="68" x2="86" y2="68" stroke="#C8A84B" strokeWidth="2" strokeLinecap="round" />

      {/* Point lime en haut */}
      <circle cx="50" cy="16" r="5" fill="#A8FF78" />
    </svg>
  )
}
