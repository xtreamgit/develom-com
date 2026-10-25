import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const TOK = 'a147e1f2c98c3493941403a948586cb3af0f'

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('tok') !== TOK) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })

  // Read full current navigation — depth:0 avoids join errors on unmigrated columns
  const current = await payload.findGlobal({ slug: 'navigation', depth: 0 })

  const mainNav: any[] = current.mainNav ?? []
  const industryIdx = mainNav.findIndex(
    (item: any) => item.label === 'Industry' || item.label === 'Industries'
  )

  if (industryIdx === -1) {
    return NextResponse.json({ error: 'Industry item not found in mainNav', mainNav }, { status: 404 })
  }

  const before = mainNav[industryIdx]

  // Patch only the Industries item; all other items in mainNav untouched
  const patched = mainNav.map((item: any, idx: number) => {
    if (idx !== industryIdx) return item
    return {
      ...item,
      label: 'Industries',
      link: '/industries',
      children: [
        { label: 'Non-Profit', link: '/industries/non-profit' },
        { label: 'Oil & Gas', link: '/industries/oil-gas' },
      ],
    }
  })

  const after = patched[industryIdx]

  // Write back: patched mainNav + preserved footerNav + preserved ctaButton
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      mainNav: patched,
      footerNav: current.footerNav,
      ctaButton: current.ctaButton,
    },
  })

  return NextResponse.json({ ok: true, before, after })
}
