import { getHeaderWidgetData } from '@/lib/getGlobals'
import { relativeTime } from '@/lib/relativeTime'

export default async function NewsWidget() {
  let widgetData
  try {
    widgetData = await getHeaderWidgetData()
  } catch {
    return null
  }

  const lastUpdatedText = widgetData?.lastContentUpdate
    ? `Updated ${relativeTime(widgetData.lastContentUpdate)}.`
    : null

  const latestModelText = (() => {
    const m = widgetData?.latestAIModel
    if (!m?.releasedAt || !m.name) return null
    const parts = [`New model ${relativeTime(m.releasedAt)} — ${m.name}`]
    if (m.mainFeature) parts.push(m.mainFeature)
    return parts.join(' · ')
  })()

  if (!lastUpdatedText && !latestModelText) return null

  return (
    <section className="w-full bg-[#F0F6FF] border-y border-[#DBEAFE]">
      <div className="mx-auto max-w-content px-6 py-3.5 flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] px-2.5 py-1 text-[11px] font-semibold text-white uppercase tracking-wide flex-shrink-0">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-2.83-2h5.66A3 3 0 0110 18z" />
          </svg>
          What&apos;s New
        </span>
        <div className="flex items-center gap-2 text-[13px] text-slate-600 flex-wrap">
          {lastUpdatedText && <span>{lastUpdatedText}</span>}
          {lastUpdatedText && latestModelText && (
            <span className="text-slate-300" aria-hidden="true">·</span>
          )}
          {latestModelText && <span>{latestModelText}</span>}
        </div>
      </div>
    </section>
  )
}
