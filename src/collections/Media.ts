import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, crop: 'centre' },
      { name: 'card', width: 800, height: 600, crop: 'centre' },
      { name: 'hero', width: 1600, height: 900, crop: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
}
