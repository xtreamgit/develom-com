import type { CollectionConfig } from 'payload'
import { canCreate, canUpdate, canDelete } from '../access/roles'
import { setCreatedBy } from '../hooks/setCreatedBy'

export const PortfolioProjects: CollectionConfig = {
  slug: 'portfolio-projects',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  access: {
    create: canCreate,
    read: () => true,
    update: canUpdate,
    delete: canDelete,
  },
  hooks: {
    beforeChange: [setCreatedBy],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'stack', type: 'text', required: true },
    { name: 'problem', type: 'textarea', required: true },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      required: true,
    },
    { name: 'flagship', type: 'checkbox', defaultValue: false },
    { name: 'imageUrl', type: 'text' },
    { name: 'demoUrl', type: 'text' },
    {
      name: 'status',
      type: 'select',
      options: ['coming-soon', 'live'],
      defaultValue: 'coming-soon',
    },
    { name: 'order', type: 'number', defaultValue: 0 },
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
}
