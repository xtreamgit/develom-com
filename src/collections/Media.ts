import type { CollectionConfig } from 'payload'
import { canCreate, canUpdate, canDelete, hasRole } from '../access/roles'
import { setCreatedBy } from '../hooks/setCreatedBy'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
    useAsTitle: 'title',
    defaultColumns: ['filename', 'title', 'folder', 'fileType', 'formatNote', 'inUse', 'updatedAt'],
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
          if (mime === 'image/svg+xml') {
            data.fileType = 'image'
            data.formatNote = 'vector-svg'
          } else if (mime.startsWith('image/')) {
            data.fileType = 'image'
            data.formatNote = 'raster'
          } else if (mime.startsWith('video/')) {
            data.fileType = 'video'
          } else if (mime.startsWith('audio/')) {
            data.fileType = 'audio'
          } else if (mime === 'application/pdf') {
            data.fileType = 'pdf'
          } else if (mime.includes('document') || mime.includes('word') || mime.includes('text')) {
            data.fileType = 'document'
          } else {
            data.fileType = 'other'
          }
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
    // Raster images are converted to WebP at each size. SVGs are not processed
    // by sharp (Payload skips imageSizes for SVG MIME type automatically).
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre', formatOptions: { format: 'webp', options: { quality: 82 } } },
      { name: 'card', width: 800, height: 600, position: 'centre', formatOptions: { format: 'webp', options: { quality: 82 } } },
      { name: 'hero', width: 1200, position: 'centre', formatOptions: { format: 'webp', options: { quality: 85 } } },
      { name: 'og', width: 1200, height: 630, position: 'centre', formatOptions: { format: 'webp', options: { quality: 85 } } },
      { name: 'avatar', width: 200, height: 200, position: 'centre', formatOptions: { format: 'webp', options: { quality: 80 } } },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Display name for this asset — e.g. "Hero background – Healthcare landing"',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Descriptive alt text for accessibility and SEO' },
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: { description: 'Caption for display below images' },
    },
    {
      name: 'creator',
      type: 'text',
      admin: {
        description: 'Who created this asset — e.g. "Viz pipeline", "Mara", "Hector", "Stock"',
      },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Third-party photographer or source attribution (if applicable)' },
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
      name: 'formatNote',
      type: 'select',
      options: [
        { label: 'Raster (PNG/JPG/WebP)', value: 'raster' },
        { label: 'Vector / SVG', value: 'vector-svg' },
      ],
      admin: {
        description: 'Auto-detected on upload. Use vector/SVG for icons, logos, illustrations.',
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'inUse',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check when this asset is actively used on a live page',
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: { description: 'Keywords for SEO and filtering' },
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
        description: 'Payload user who uploaded this asset',
      },
    },
  ],
}
