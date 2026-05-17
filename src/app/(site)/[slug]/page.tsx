import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RenderBlocks from '@/components/blocks/RenderBlocks'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPage(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
    limit: 1,
    depth: 2,
  })
  return docs[0] ?? null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const page = docs[0]
  if (!page) return {}

  return {
    title: page.meta?.metaTitle ?? page.title,
    description: page.meta?.metaDescription ?? undefined,
    openGraph:
      page.meta?.metaImage && typeof page.meta.metaImage === 'object' && 'url' in page.meta.metaImage
        ? { images: [{ url: (page.meta.metaImage as { url: string }).url }] }
        : {},
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blocks = page.layout as any[] | null | undefined

  return (
    <main>
      <RenderBlocks blocks={blocks} />
    </main>
  )
}
