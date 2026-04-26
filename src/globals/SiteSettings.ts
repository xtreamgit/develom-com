import type { GlobalConfig } from 'payload'
import { isAdmin, isLoggedIn } from '../access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: isLoggedIn,
    update: isAdmin,
  },
  admin: {
    group: 'Site Config',
  },
  fields: [
    // --- Site Identity ---
    {
      name: 'siteTitle',
      type: 'text',
      defaultValue: 'Develom',
      admin: { description: 'Used in browser tab and meta tags' },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue:
        'AI consulting and development for regulated industries. HIPAA, AML, SOC 2 compliant solutions.',
      admin: {
        description: "Default meta description — used when pages don't have their own",
      },
    },
    {
      name: 'defaultMetaImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Default OG image — uses the og image size (1200×630)' },
    },

    // --- CTA ---
    {
      name: 'primaryCTA',
      type: 'text',
      defaultValue: 'Book a Discovery Call',
    },

    // --- Contact Info ---
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'hello@develom.com',
    },
    {
      name: 'contactPhone',
      type: 'text',
      admin: { description: 'Optional — display format e.g. "+1 (555) 123-4567"' },
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'zip', type: 'text' },
        { name: 'country', type: 'text', defaultValue: 'United States' },
      ],
    },
    {
      name: 'businessHours',
      type: 'textarea',
      admin: { description: 'Free-text business hours — displayed on contact page' },
    },

    // --- Social Links ---
    { name: 'linkedinUrl', type: 'text' },
    { name: 'githubUrl', type: 'text' },
    { name: 'twitterUrl', type: 'text' },
    { name: 'youtubeUrl', type: 'text' },
    { name: 'instagramUrl', type: 'text' },

    // --- Analytics & Scripts ---
    {
      name: 'googleAnalyticsId',
      type: 'text',
      defaultValue: 'G-CP1M66J7RB',
      admin: { description: 'GA4 Measurement ID' },
    },
    {
      name: 'scripts',
      type: 'group',
      admin: { description: 'Custom scripts for GTM, pixels, etc. Admin-only.' },
      fields: [
        {
          name: 'headScripts',
          type: 'code',
          admin: {
            language: 'html',
            description: 'Injected into <head> — for GTM, meta tags, etc.',
          },
        },
        {
          name: 'bodyScripts',
          type: 'code',
          admin: {
            language: 'html',
            description: 'Injected before </body> — for tracking pixels, chat widgets, etc.',
          },
        },
      ],
    },
  ],
}
