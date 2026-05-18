'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const OPENING = "Hi! I'm Velom, Develom's AI discovery guide. I'll help you find the right AI solution for your team. What industry are you in?"

export default function VelomChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { role: 'user', content: trimmed }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })

      if (!res.ok || !res.body) throw new Error('request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })

        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            const delta = parsed?.delta?.text ?? parsed?.delta?.content ?? ''
            if (delta) {
              assistantText += delta
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: assistantText }
                return updated
              })
            }
          } catch {
            // skip malformed SSE lines
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  const handleOpen = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: OPENING }])
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue shadow-lg hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open Velom AI chat"
        >
          <Image src="/velom/velom.svg" alt="Velom" width={54} height={61} className="h-7 w-auto" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col rounded-lg bg-white shadow-lg border border-[#E2E8F0]">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3">
            <div className="flex items-center gap-2">
              <Image src="/velom/velomxs.svg" alt="Velom" width={24} height={24} />
              <span className="text-[14px] font-semibold text-navy">Velom AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-text transition-colors"
              aria-label="Close chat"
            >
              &#10005;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-[14px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' ? 'ml-auto bg-blue text-white' : 'bg-[#F1F5F9] text-text'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && messages[messages.length - 1]?.content === '' && (
              <div className="max-w-[85%] rounded-lg bg-[#F1F5F9] px-3 py-2 text-[14px] text-muted">
                Thinking…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-[#E2E8F0] px-4 py-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your answer…"
                className="flex-1 rounded border border-[#E2E8F0] px-3 py-2 text-[14px] text-text placeholder:text-muted focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="rounded bg-blue px-4 py-2 text-[14px] font-semibold text-white hover:brightness-90 disabled:opacity-50 transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
