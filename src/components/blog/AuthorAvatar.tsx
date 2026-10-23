import Image from 'next/image'

const GRADIENTS = [
  'linear-gradient(to bottom right, #0F80E3, #18B8C7)',
  'linear-gradient(to bottom right, #0D3268, #1560B8)',
  'linear-gradient(to bottom right, #1560B8, #3A90E0)',
  'linear-gradient(to bottom right, #18B8C7, #3A90E0)',
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

interface AuthorAvatarProps {
  /** Author display name — used for initials and alt text */
  name: string
  /** Diameter in px (default 30) */
  size?: number
  /**
   * Portrait image URL. Leave undefined until sourced images are available —
   * falls back to initials-monogram automatically.
   */
  src?: string
  /** Index used to pick a gradient variant when no portrait is shown (0–3) */
  index?: number
}

/**
 * Circular author avatar. Renders a portrait when `src` is provided; otherwise
 * shows an initials monogram on a gradient background.
 *
 * Portrait wiring is intentionally deferred — pass `src` when sourced images land.
 */
export function AuthorAvatar({ name, size = 30, src, index = 0 }: AuthorAvatarProps) {
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    flexShrink: 0,
    overflow: 'hidden',
  }

  if (src) {
    return (
      <div style={containerStyle}>
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    )
  }

  const gradient = GRADIENTS[Math.abs(index) % GRADIENTS.length]
  const fontSize = Math.max(10, Math.round(size * 0.4))

  return (
    <div
      style={{
        ...containerStyle,
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.01em',
        userSelect: 'none',
      }}
      aria-label={name}
      title={name}
    >
      {getInitials(name)}
    </div>
  )
}
