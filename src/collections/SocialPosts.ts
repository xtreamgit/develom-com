import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, isLoggedIn } from '../access/roles'

export const SocialPosts: CollectionConfig = {
  slug: 'social-posts',
  admin: {
    useAsTitle: 'postTitle',
    group: 'Marketing',
    defaultColumns: ['postTitle', 'platform', 'status', 'scheduledAt', 'updatedAt'],
  },
  access: {
    read: isLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'postTitle',
      type: 'text',
      required: true,
      admin: { description: 'Internal title — not published, for your own reference' },
    },
    {
      name: 'platform',
      type: 'select',
      required: true,
      defaultValue: 'linkedin',
      options: [
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'X / Twitter', value: 'x' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Review', value: 'pending-review' },
        { label: 'Approved', value: 'approved' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'scheduledAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMM d, yyyy h:mm a',
        },
        description: 'Target publish date & time',
      },
    },
    {
      name: 'notifiedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Mara notified at this time',
        condition: (data) => Boolean(data?.notifiedAt),
      },
    },
    {
      name: 'postText',
      type: 'textarea',
      required: true,
      admin: {
        rows: 7,
        description: 'Full post copy including hashtags',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional image or thumbnail' },
    },
    {
      name: 'platformNotified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Platform message sent to Mara',
        condition: (data) => data?.status === 'approved',
      },
    },
    {
      name: 'linkedinPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/LinkedInPreview',
        },
      },
    },
    {
      name: 'publishAction',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/PublishButton',
        },
      },
    },
  ],
  timestamps: true,
}
