import React from 'react'

export default function Logo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        userSelect: 'none',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/develom_logo.svg"
        width={50}
        height={50}
        alt=""
        aria-hidden="true"
        style={{ display: 'block', flexShrink: 0 }}
      />

      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: 'var(--theme-elevation-1000)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1,
        }}
      >
        Develom
      </span>
    </div>
  )
}
