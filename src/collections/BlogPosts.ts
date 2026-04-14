import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'date', type: 'date', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    {
      name: 'pillarTag',
      type: 'select',
      required: true,
      options: ['Automation', 'Compliance', 'Scalability', 'Security', 'Sustainability'],
    },
    { name: 'body', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ],
  versions: { drafts: true },
}
