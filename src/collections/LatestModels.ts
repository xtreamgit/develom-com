import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'

export const LatestModels: CollectionConfig = {
  slug: 'latest-models',
  admin: {
    useAsTitle: 'modelName',
    group: 'Content',
    defaultColumns: ['provider', 'modelName', 'releaseDate'],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'provider',
      type: 'select',
      required: true,
      options: [
        { label: 'Anthropic', value: 'anthropic' },
        { label: 'OpenAI', value: 'openai' },
        { label: 'Google', value: 'google' },
        { label: 'Meta', value: 'meta' },
        { label: 'Mistral', value: 'mistral' },
        { label: 'xAI', value: 'xai' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'modelName',
      type: 'text',
      required: true,
    },
    {
      name: 'version',
      type: 'text',
    },
    {
      name: 'releaseDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'mainFeature',
      type: 'text',
      required: true,
      admin: { description: 'One-line headline capability (e.g. "1M token context, native tool use")' },
    },
    {
      name: 'recommendedUsage',
      type: 'text',
      required: true,
      admin: { description: 'Short recommended use case (e.g. "Complex reasoning, agentic workflows")' },
    },
    {
      name: 'modelUrl',
      type: 'text',
      admin: { description: 'Link to announcement or documentation' },
    },
  ],
}
