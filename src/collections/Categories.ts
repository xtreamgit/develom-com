import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, isLoggedIn, canDelete } from '../access/roles'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isAdminOrEditor,
    read: isLoggedIn,
    update: isAdminOrEditor,
    delete: canDelete,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'parent'],
    group: 'Taxonomy',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        description: 'Optional parent category for hierarchy (e.g. "AI" → "RAG Systems")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Brain (AI)', value: 'brain' },
        { label: 'Shield (Security)', value: 'shield' },
        { label: 'Scale (Compliance)', value: 'scale' },
        { label: 'Cloud (Infrastructure)', value: 'cloud' },
        { label: 'Code (Development)', value: 'code' },
        { label: 'Chart (Analytics)', value: 'chart' },
        { label: 'Users (Team)', value: 'users' },
        { label: 'Zap (Automation)', value: 'zap' },
      ],
      admin: { description: 'Icon identifier — frontend maps this to a Lucide icon' },
    },
  ],
}
