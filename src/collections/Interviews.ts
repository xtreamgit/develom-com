import type { CollectionConfig } from 'payload'

export const Interviews: CollectionConfig = {
  slug: 'interviews',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'company', 'status', 'createdAt'],
    group: 'Marketing',
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'answers',
      type: 'json',
      admin: { description: 'Interview question responses' },
    },
    {
      name: 'recommendation',
      type: 'json',
      admin: { description: 'Claude-generated AI roadmap' },
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'generated', 'failed'],
      defaultValue: 'pending',
    },
    {
      name: 'source',
      type: 'text',
      admin: { description: 'Origin page or campaign' },
    },
  ],
  timestamps: true,
}
