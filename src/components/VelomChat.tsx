'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function VelomChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (!apiUrl) throw new Error('API URL not configured')

      const res = await fetch(`${apiUrl}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `mutation Chat($message: String!) { chat(message: $message) { response } }`,
          variables: { message: trimmed },
        }),
      })

      const data = await res.json()
      const reply = data?.data?.chat?.response || 'Sorry, I could not process that request.'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading])

  return (
    <>
      {/* Chat bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue shadow-lg hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open Velom AI chat"
        >
          <Image src="/velom/velom.svg" alt="Velom" width={54} height={61} className="h-7 w-auto" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col rounded-lg bg-white shadow-lg border border-[#E2E8F0]">
          {/* Header */}
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

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <p className="text-[14px] text-muted">
                Hi! I{'\u2019'}m Velom, Develom{'\u2019'}s AI assistant. How can I help?
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-[14px] ${
                  msg.role === 'user'
                    ? 'ml-auto bg-blue text-white'
                    : 'bg-[#F1F5F9] text-text'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-lg bg-[#F1F5F9] px-3 py-2 text-[14px] text-muted">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[#E2E8F0] px-4 py-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask Velom anything..."
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
