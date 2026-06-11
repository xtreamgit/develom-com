'use client'

import { useState } from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

export default function PublishButton() {
  const { id } = useDocumentInfo()
  const status = useFormFields(([fields]) => fields.status?.value as string)
  const postTitle = useFormFields(([fields]) => fields.postTitle?.value as string)
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  if (status !== 'pending-review') return null

  async function handlePublish() {
    if (!id || state === 'loading') return
    setState('loading')
    try {
      const res = await fetch(`/api/social-posts/publish/${id}`, { method: 'POST' })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        if (body.error === 'Already approved') {
          setState('done')
          return
        }
        throw new Error(body.error ?? res.statusText)
      }
      setState('done')
      // Brief pause so user sees the success state, then reload to show updated status
      setTimeout(() => window.location.reload(), 1200)
    } catch (err) {
      console.error('[PublishButton]', err)
      setState('error')
    }
  }

  const BG = {
    idle:    '#16A34A',
    loading: '#6B7280',
    done:    '#16A34A',
    error:   '#DC2626',
  }

  const LABEL = {
    idle:    '✓ Approve & Notify Mara',
    loading: 'Publishing…',
    done:    '✓ Approved — Mara notified',
    error:   'Error — try again',
  }

  return (
    <div style={{ marginTop: 28, padding: 20, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10 }}>
      <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: '#166534' }}>
        Ready to publish?
      </p>
      <p style={{ margin: '0 0 14px', fontSize: 13, color: '#166534', opacity: 0.8 }}>
        This will mark <strong>{postTitle || 'this post'}</strong> as Approved and email Mara to schedule it.
      </p>
      <button
        type="button"
        onClick={handlePublish}
        disabled={state === 'loading' || state === 'done'}
        style={{
          background: BG[state],
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 22px',
          fontSize: 14,
          fontWeight: 600,
          cursor: state === 'loading' || state === 'done' ? 'default' : 'pointer',
          opacity: state === 'loading' ? 0.7 : 1,
          transition: 'background 0.15s, opacity 0.15s',
        }}
      >
        {LABEL[state]}
      </button>
      {state === 'error' && (
        <p style={{ margin: '10px 0 0', fontSize: 12, color: '#DC2626' }}>
          Something went wrong. Check the browser console for details.
        </p>
      )}
    </div>
  )
}
