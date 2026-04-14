import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'serviceGroup', 'status'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'serviceGroup',
      type: 'select',
      required: true,
      options: [
        { label: 'AI Architecture & Systems Design', value: 'architecture' },
        { label: 'AI Application Development', value: 'application' },
        { label: 'Automation Solutioning', value: 'automation' },
      ],
    },
    { name: 'complianceAngle', type: 'text' },
    { name: 'tagline', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'body', type: 'richText' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Start a Project' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/contact' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
    },
    { name: 'sortOrder', type: 'number' },
  ],
}
