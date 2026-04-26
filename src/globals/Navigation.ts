import type { GlobalConfig } from 'payload'
import { isLoggedIn, isAdminOrEditor } from '../access/roles'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: isLoggedIn,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Site Config',
  },
  fields: [
    {
      name: 'mainNav',
      type: 'array',
      label: 'Main Navigation',
      admin: { description: 'Top navigation bar items. Order matters — first item appears leftmost.' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Display text — e.g. "Services"' },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: { description: 'URL path — e.g. "/services" or "https://calendly.com/..."' },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Items',
          admin: { description: 'Optional sub-navigation — appears as a dropdown on hover' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'footerNav',
      type: 'array',
      label: 'Footer Navigation',
      admin: { description: 'Footer link groups — each group has a heading and list of links' },
      fields: [
        {
          name: 'groupLabel',
          type: 'text',
          required: true,
          admin: { description: 'Group heading — e.g. "Company", "Services", "Resources"' },
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Navigation CTA Button',
      admin: { description: 'The primary call-to-action button in the navigation bar' },
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Book a Discovery Call',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/contact',
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Blue)', value: 'primary' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      ],
    },
  ],
}
