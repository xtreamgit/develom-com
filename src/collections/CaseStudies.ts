import type { CollectionConfig } from 'payload'
import { canCreate, isLoggedIn, canUpdate, canDelete, canPublish } from '../access/roles'
import { setCreatedBy } from '../hooks/setCreatedBy'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'industry', 'published', 'updatedAt'],
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
  versions: { drafts: true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'URL path — e.g. "voice-rag-compliance" → /case-studies/voice-rag-compliance',
      },
    },
    {
      name: 'client',
      type: 'text',
      admin: { description: 'Client name — leave blank if under NDA' },
    },
    {
      name: 'industry',
      type: 'select',
      required: true,
      options: [
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Financial Services', value: 'financial-services' },
        { label: 'Insurance', value: 'insurance' },
        { label: 'Legal', value: 'legal' },
        { label: 'Technology', value: 'technology' },
        { label: 'Other', value: 'other' },
      ],
      admin: { description: 'Target industry — matches Develom ICP segments' },
    },
    {
      name: 'challenge',
      type: 'richText',
      required: true,
      admin: { description: 'What problem did the client face?' },
    },
    {
      name: 'solution',
      type: 'richText',
      required: true,
      admin: { description: 'How did Develom solve it?' },
    },
    {
      name: 'results',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'metric',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "Response Time"' },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "3.2s → 0.4s"' },
        },
        {
          name: 'description',
          type: 'text',
          admin: { description: 'Optional context — e.g. "88% improvement"' },
        },
      ],
      admin: { description: 'Quantifiable results — at least one metric required' },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      required: true,
    },
    {
      name: 'stack',
      type: 'text',
      admin: { description: 'Technology stack used — e.g. "LangGraph · PGVector · GCP"' },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      access: { update: canPublish },
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
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
}
