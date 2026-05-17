import { unstable_noStore as noStore } from 'next/cache'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  noStore()
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'latest-models',
      overrideAccess: true,
      sort: '-releaseDate',
      limit: 1,
      depth: 0,
    })
    const model = docs[0] ?? null
    return NextResponse.json(
      { model },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' } }
    )
  } catch {
    return NextResponse.json({ model: null }, { status: 500 })
  }
}
