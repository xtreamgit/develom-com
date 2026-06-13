import type { CollectionConfig, Block } from 'payload'
import { canCreate, isLoggedIn, canUpdate, canDelete, canPublish } from '../access/roles'
import { setCreatedBy } from '../hooks/setCreatedBy'

const heroBlock: Block = {
  slug: 'hero-block',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'ctaText', type: 'text', defaultValue: 'Book a Discovery Call' },
    { name: 'ctaLink', type: 'text', defaultValue: '/contact' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'navy',
      options: [
        { label: 'Navy (#0D1B2A)', value: 'navy' },
        { label: 'White', value: 'white' },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
  ],
}

const richTextBlock: Block = {
  slug: 'rich-text-block',
  labels: { singular: 'Rich Text', plural: 'Rich Text' },
  fields: [{ name: 'content', type: 'richText', required: true }],
}

const twoColumnBlock: Block = {
  slug: 'two-column-block',
  labels: { singular: 'Two Column', plural: 'Two Columns' },
  fields: [
    { name: 'leftContent', type: 'richText', required: true },
    {
      name: 'rightType',
      type: 'select',
      defaultValue: 'richText',
      options: [
        { label: 'Rich Text', value: 'richText' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'rightContent',
      type: 'richText',
      admin: { condition: (_, siblingData) => siblingData?.rightType === 'richText' },
    },
    {
      name: 'rightImage',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, siblingData) => siblingData?.rightType === 'image' },
    },
  ],
}

const ctaBlock: Block = {
  slug: 'cta-block',
  labels: { singular: 'CTA', plural: 'CTAs' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'buttonText', type: 'text', defaultValue: 'Book a Discovery Call' },
    { name: 'buttonLink', type: 'text', defaultValue: '/contact' },
  ],
}

const imageBlock: Block = {
  slug: 'image-block',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'contained',
      options: [
        { label: 'Contained (680px)', value: 'contained' },
        { label: 'Full Width (1100px)', value: 'full' },
      ],
    },
  ],
}

const faqBlock: Block = {
  slug: 'faq-block',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Frequently Asked Questions' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'richText', required: true },
      ],
    },
  ],
}

const RESERVED_SLUGS = ['services', 'about', 'portfolio', 'blog', 'contact', 'admin', 'api']

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Content',
    preview: (doc) => {
      if (doc?.slug) return `/${doc.slug as string}`
      return null
    },
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
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path — e.g. "privacy-policy" → /privacy-policy',
        placeholder: 'privacy-policy',
      },
      validate: (value: unknown) => {
        if (typeof value === 'string' && RESERVED_SLUGS.includes(value)) {
          return `"${value}" is reserved — choose a different slug`
        }
        return true
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
      access: { update: canPublish },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: { description: 'Overrides page title in <title> tag' },
        },
        { name: 'metaDescription', type: 'textarea', maxLength: 160 },
        { name: 'metaImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [heroBlock, richTextBlock, twoColumnBlock, ctaBlock, imageBlock, faqBlock],
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
