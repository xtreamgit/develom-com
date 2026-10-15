import type { CollectionConfig } from 'payload'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { canCreate, isLoggedIn, canUpdate, canDelete } from '../access/roles'
import { setCreatedBy } from '../hooks/setCreatedBy'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/, '')
}

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  access: {
    create: canCreate,
    read: isLoggedIn,
    update: canUpdate,
    delete: canDelete,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        // Slugify the slug field before saving — prevents spaces and invalid chars
        if (data?.slug) {
          data.slug = slugify(data.slug)
        }
        // Accept body as a markdown string from API clients (e.g. the writer agent).
        // The admin UI sends body as a Lexical object — leave that path untouched.
        if (data && typeof data.body === 'string' && data.body.trim().length > 0) {
          const editorConfig = await editorConfigFactory.default({ config: req.payload.config })
          data.body = convertMarkdownToLexical({ editorConfig, markdown: data.body })
        }
        return data
      },
    ],
    beforeChange: [setCreatedBy],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'date', type: 'date', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      required: true,
      admin: { description: 'One or more pillar tags' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: { description: 'Primary content category' },
    },
    { name: 'body', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Auto-set to the creating user',
      },
    },
  ],
  versions: { drafts: true },
}
