import type { CollectionConfig } from 'payload'
import { canCreate, canUpdate, canDelete, hasRole } from '../access/roles'
import { setCreatedBy } from '../hooks/setCreatedBy'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'folder', 'fileType', 'alt', 'updatedAt'],
  },
  access: {
    create: canCreate,
    read: ({ req: { user } }) => {
      if (hasRole(user, ['admin', 'editor'])) return true
      // Authors and viewers can only see public and internal assets
      return { accessLevel: { in: ['public', 'internal'] } }
    },
    update: canUpdate,
    delete: canDelete,
  },
  hooks: {
    beforeChange: [
      setCreatedBy,
      ({ data, req }) => {
        const mime = (req as { file?: { mimetype?: string } }).file?.mimetype
        if (mime) {
          if (mime.startsWith('image/')) data.fileType = 'image'
          else if (mime.startsWith('video/')) data.fileType = 'video'
          else if (mime.startsWith('audio/')) data.fileType = 'audio'
          else if (mime === 'application/pdf') data.fileType = 'pdf'
          else if (mime.includes('document') || mime.includes('word') || mime.includes('text'))
            data.fileType = 'document'
          else data.fileType = 'other'
        }
        return data
      },
    ],
  },
  upload: {
    mimeTypes: [
      'image/*',
      'video/*',
      'audio/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.*',
      'text/plain',
      'text/csv',
      'text/markdown',
    ],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
      { name: 'avatar', width: 200, height: 200, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Descriptive alt text for accessibility' },
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: { description: 'Caption for display below images' },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer or source attribution' },
    },
    {
      name: 'folder',
      type: 'relationship',
      relationTo: 'media-folders',
      admin: { description: 'Organize into a folder' },
    },
    {
      name: 'fileType',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Audio', value: 'audio' },
        { label: 'Document', value: 'document' },
        { label: 'PDF', value: 'pdf' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Auto-populated from MIME type on upload',
        readOnly: true,
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: { description: 'Tag for filtering and organization' },
    },
    {
      name: 'license',
      type: 'select',
      defaultValue: 'owned',
      options: [
        { label: 'Owned', value: 'owned' },
        { label: 'Licensed', value: 'licensed' },
        { label: 'Creative Commons', value: 'creative-commons' },
        { label: 'Public Domain', value: 'public-domain' },
      ],
    },
    {
      name: 'expirationDate',
      type: 'date',
      admin: {
        description: 'License expiration — only relevant for licensed assets',
        condition: (_, siblingData) => siblingData?.license === 'licensed',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'accessLevel',
      type: 'select',
      defaultValue: 'public',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Internal', value: 'internal' },
        { label: 'Restricted', value: 'restricted' },
      ],
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
