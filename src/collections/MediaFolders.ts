import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, isLoggedIn, canDelete } from '../access/roles'

export const MediaFolders: CollectionConfig = {
  slug: 'media-folders',
  admin: {
    group: 'Media',
    useAsTitle: 'name',
    defaultColumns: ['name', 'parent', 'color'],
  },
  access: {
    create: isAdminOrEditor,
    read: isLoggedIn,
    update: isAdminOrEditor,
    delete: canDelete,
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
      admin: {
        description: 'URL-safe identifier for this folder',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'media-folders',
      admin: {
        description: 'Parent folder (leave empty for top-level)',
      },
    },
    {
      name: 'colorLabel',
      type: 'select',
      defaultValue: 'gray',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Amber', value: 'amber' },
        { label: 'Red', value: 'red' },
        { label: 'Purple', value: 'purple' },
        { label: 'Gray', value: 'gray' },
      ],
      admin: { description: 'Visual label for quick folder identification' },
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
