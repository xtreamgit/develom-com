'use client'

import { useFormFields } from '@payloadcms/ui'

const GLOBE_ICON = (
  <svg viewBox="0 0 16 16" fill="none" width={12} height={12} style={{ display: 'inline', verticalAlign: 'middle' }} aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="#666" strokeWidth="1.25" />
    <path d="M8 1c-2 2-3 4-3 7s1 5 3 7M8 1c2 2 3 4 3 7s-1 5-3 7M1 8h14" stroke="#666" strokeWidth="1.25" />
  </svg>
)

const LIKE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" width={18} height={18} aria-hidden="true">
    <path d="M7 22V11M2 13v7a2 2 0 0 0 2 2h11.47a2 2 0 0 0 1.98-1.7l1.05-7A2 2 0 0 0 16.52 11H13V7a2 2 0 0 0-2-2H9l-2 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const COMMENT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" width={18} height={18} aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const REPOST_ICON = (
  <svg viewBox="0 0 24 24" fill="none" width={18} height={18} aria-hidden="true">
    <path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const SEND_ICON = (
  <svg viewBox="0 0 24 24" fill="none" width={18} height={18} aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '10px 16px', cursor: 'default', borderRadius: 4, color: '#666', fontSize: 13, fontWeight: 600, userSelect: 'none' }}>
      {icon}
      <span>{label}</span>
    </div>
  )
}

function renderText(text: string) {
  // Highlight hashtags and mentions
  return text.split(/(\s|^)(#\w+|@\w+)/g).map((part, i) => {
    if (/^[#@]/.test(part)) {
      return <span key={i} style={{ color: '#0a66c2', fontWeight: 500 }}>{part}</span>
    }
    return part
  })
}

export default function LinkedInPreview() {
  const platform = useFormFields(([fields]) => fields.platform?.value as string)
  const postText = useFormFields(([fields]) => fields.postText?.value as string)

  if (platform !== 'linkedin') return null

  const text = (postText ?? '').trim()

  return (
    <div style={{ marginTop: 24 }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 10 }}>
        LinkedIn Preview
      </p>

      {/* LinkedIn card shell */}
      <div
        style={{
          maxWidth: 552,
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          boxShadow: '0 0 0 1px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)',
        }}
      >
        {/* Post header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px 0' }}>
          {/* Company logo avatar */}
          <div style={{ width: 48, height: 48, borderRadius: 4, overflow: 'hidden', flexShrink: 0, border: '1px solid #e0e0e0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/develom_logo.svg" alt="Develom" style={{ width: 40, height: 40, objectFit: 'contain' }} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#000', lineHeight: 1.3 }}>
              Develom
            </div>
            <div style={{ fontSize: 12, color: '#666', lineHeight: 1.4, marginTop: 1 }}>
              AI compliance &amp; risk platform
            </div>
            <div style={{ fontSize: 12, color: '#666', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <span>just now</span>
              <span>·</span>
              {GLOBE_ICON}
            </div>
          </div>

          {/* Follow button */}
          <button
            type="button"
            style={{ flexShrink: 0, border: '1px solid #0a66c2', color: '#0a66c2', background: 'transparent', borderRadius: 20, padding: '5px 16px', fontSize: 14, fontWeight: 600, cursor: 'default' }}
            tabIndex={-1}
          >
            + Follow
          </button>
        </div>

        {/* Post text */}
        <div style={{ padding: '10px 16px 12px' }}>
          {text ? (
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#000', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {renderText(text)}
            </p>
          ) : (
            <p style={{ margin: 0, fontSize: 14, color: '#aaa', fontStyle: 'italic' }}>
              Post text will appear here…
            </p>
          )}
        </div>

        {/* Engagement counts */}
        <div style={{ padding: '0 16px 6px', borderBottom: '1px solid #e0e0e0' }}>
          <span style={{ fontSize: 12, color: '#666' }}>Be the first to react</span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '2px 0' }}>
          <ActionBtn icon={LIKE_ICON}    label="Like"     />
          <ActionBtn icon={COMMENT_ICON} label="Comment"  />
          <ActionBtn icon={REPOST_ICON}  label="Repost"   />
          <ActionBtn icon={SEND_ICON}    label="Send"     />
        </div>
      </div>

      <p style={{ marginTop: 8, fontSize: 12, color: '#94A3B8' }}>
        Mockup only — spacing and rendering may vary slightly on LinkedIn.
      </p>
    </div>
  )
}
