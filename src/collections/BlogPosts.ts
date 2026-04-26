import type { CollectionConfig } from 'payload'
import { canCreate, isLoggedIn, canUpdate, canDelete, canPublish } from '../access/roles'
import { setCreatedBy } from '../hooks/setCreatedBy'

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
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      access: { update: canPublish },
    },
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
