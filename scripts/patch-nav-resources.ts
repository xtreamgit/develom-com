/**
 * One-off patch: add Resources dropdown children to the navigation global.
 * Run with: npx tsx --env-file=.env.local scripts/patch-nav-resources.ts
 */
import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function run() {
  const payload = await getPayload({ config: configPromise })

  const nav = await payload.findGlobal({ slug: 'navigation' })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mainNav: any[] = Array.isArray((nav as any).mainNav) ? (nav as any).mainNav : []

  const updatedNav = mainNav.map((item: any) => {
    if (item.label === 'Resources') {
      return {
        ...item,
        link: '/resources',
        children: [
          { label: 'AI Governance Guide', link: '/resources/ai-governance-guide' },
          { label: 'Agentic AI Tools', link: '/resources/agentic-ai-tools' },
        ],
      }
    }
    return item
  })

  // If Resources entry didn't exist, add it
  if (!mainNav.some((item: any) => item.label === 'Resources')) {
    updatedNav.push({
      label: 'Resources',
      link: '/resources',
      children: [
        { label: 'AI Governance Guide', link: '/resources/ai-governance-guide' },
        { label: 'Agentic AI Tools', link: '/resources/agentic-ai-tools' },
      ],
    })
  }

  await payload.updateGlobal({
    slug: 'navigation',
    data: { ...(nav as any), mainNav: updatedNav },
  })

  console.log('✓ Navigation global patched — Resources dropdown updated.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
