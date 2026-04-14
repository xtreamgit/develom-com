import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'primaryCTA', type: 'text', defaultValue: 'Book a Discovery Call' },
    { name: 'email', type: 'email' },
    { name: 'linkedinUrl', type: 'text' },
    { name: 'githubUrl', type: 'text' },
    { name: 'twitterUrl', type: 'text' },
    { name: 'youtubeUrl', type: 'text' },
    { name: 'instagramUrl', type: 'text' },
  ],
}
