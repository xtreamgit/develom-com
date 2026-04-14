import type { CollectionConfig } from 'payload'

export const PortfolioProjects: CollectionConfig = {
  slug: 'portfolio-projects',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'stack', type: 'text', required: true },
    { name: 'problem', type: 'textarea', required: true },
    {
      name: 'pillars',
      type: 'select',
      hasMany: true,
      options: ['Automation', 'Compliance', 'Scalability', 'Security', 'Sustainability'],
    },
    { name: 'flagship', type: 'checkbox', defaultValue: false },
    { name: 'demoUrl', type: 'text' },
    {
      name: 'status',
      type: 'select',
      options: ['coming-soon', 'live'],
      defaultValue: 'coming-soon',
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
