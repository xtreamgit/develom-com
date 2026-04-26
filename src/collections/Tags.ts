import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, isLoggedIn, canDelete } from '../access/roles'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    create: isAdminOrEditor,
    read: isLoggedIn,
    update: isAdminOrEditor,
    delete: canDelete,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'color'],
    group: 'Taxonomy',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-safe identifier. Auto-generated from name if left blank.' },
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      admin: {
        description: 'Hex color for chip display (e.g. #2563EB)',
        placeholder: '#2563EB',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Optional — used in tag archive pages and tooltips' },
    },
  ],
}
