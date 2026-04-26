import type { CollectionConfig } from 'payload'
import { canCreate, isLoggedIn, canUpdate, canDelete } from '../access/roles'
import { setCreatedBy } from '../hooks/setCreatedBy'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'company', 'featured', 'updatedAt'],
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
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: { description: 'The testimonial text — keep under 200 words for display' },
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      admin: { description: 'Full name of the person giving the testimonial' },
    },
    {
      name: 'authorTitle',
      type: 'text',
      admin: { description: 'Job title — e.g. "CTO" or "VP Engineering"' },
    },
    {
      name: 'company',
      type: 'text',
      admin: { description: 'Company name' },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Headshot — uses the avatar image size (200×200)' },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Optional 1-5 star rating',
        step: 1,
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: { description: 'Which pillars does this testimonial relate to?' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured testimonials appear on the homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Display order (lower = first)' },
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
