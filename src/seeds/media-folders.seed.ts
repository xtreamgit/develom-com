import { getPayload } from 'payload'
import configPromise from '@payload-config'

type ColorLabel = 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'gray'

interface FolderDef {
  name: string
  slug: string
  colorLabel: ColorLabel
  description: string
}

interface ChildFolderDef extends FolderDef {
  parentSlug: string
}

// Root-level folders first; children resolved in a second pass
const ROOT_FOLDERS: FolderDef[] = [
  {
    name: 'Brand Assets',
    slug: 'brand-assets',
    colorLabel: 'blue',
    description: 'Logos, icons, brand marks, and identity assets',
  },
  {
    name: 'Blog Images',
    slug: 'blog-images',
    colorLabel: 'green',
    description: 'Hero images and inline media for blog posts',
  },
  {
    name: 'Portfolio',
    slug: 'portfolio',
    colorLabel: 'purple',
    description: 'Project screenshots, case study images, and portfolio visuals',
  },
  {
    name: 'Team Photos',
    slug: 'team-photos',
    colorLabel: 'amber',
    description: 'Headshots and team photography',
  },
  {
    name: 'Documents',
    slug: 'documents',
    colorLabel: 'gray',
    description: 'PDFs, whitepapers, and downloadable files',
  },
]

const CHILD_FOLDERS: ChildFolderDef[] = [
  {
    name: 'Logos',
    slug: 'logos',
    colorLabel: 'blue',
    parentSlug: 'brand-assets',
    description: 'Full logotype and lockup variants',
  },
  {
    name: 'Icons',
    slug: 'icons',
    colorLabel: 'blue',
    parentSlug: 'brand-assets',
    description: 'App icons, favicons, and symbol marks',
  },
]

export async function seedMediaFolders() {
  const payload = await getPayload({ config: configPromise })

  // Pass 1 — create root folders
  const slugToId: Record<string, number> = {}

  for (const folder of ROOT_FOLDERS) {
    const existing = await payload.find({
      collection: 'media-folders',
      where: { slug: { equals: folder.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  → "${folder.name}" already exists, skipping`)
      slugToId[folder.slug] = existing.docs[0].id as number
      continue
    }

    const created = await payload.create({
      collection: 'media-folders',
      data: folder,
    })
    slugToId[folder.slug] = created.id as number
    console.log(`  ✓ Created: ${folder.name}`)
  }

  // Pass 2 — create child folders with parent IDs resolved
  for (const child of CHILD_FOLDERS) {
    const existing = await payload.find({
      collection: 'media-folders',
      where: { slug: { equals: child.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  → "${child.name}" already exists, skipping`)
      continue
    }

    const parentId = slugToId[child.parentSlug]
    if (!parentId) {
      console.warn(`  ⚠ Parent "${child.parentSlug}" not found for "${child.name}", skipping`)
      continue
    }

    const { parentSlug: _, ...rest } = child
    await payload.create({
      collection: 'media-folders',
      data: { ...rest, parent: parentId },
    })
    console.log(`  ✓ Created: ${child.name} (under ${child.parentSlug})`)
  }

  console.log('\nMedia folders seed complete.')
}

// Allow direct execution: npx tsx src/seeds/media-folders.seed.ts
const _isMain = import.meta.url === `file://${process.argv[1]}`
if (_isMain) {
  seedMediaFolders()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
