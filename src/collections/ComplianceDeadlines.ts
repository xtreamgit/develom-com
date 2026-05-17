import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'

export const ComplianceDeadlines: CollectionConfig = {
  slug: 'compliance-deadlines',
  admin: {
    useAsTitle: 'requirement',
    group: 'Content',
    defaultColumns: ['requirement', 'vertical', 'dueDate', 'regulatoryBody'],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'requirement',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "EU AI Act High-Risk Conformity Assessment"' },
    },
    {
      name: 'dueDate',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'MMM d, yyyy' },
        description: 'For recurring deadlines this anchors the month/day — year rolls forward automatically',
      },
    },
    {
      name: 'vertical',
      type: 'select',
      required: true,
      options: [
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Financial Services', value: 'financial-services' },
        { label: 'Legal', value: 'legal' },
        { label: 'Insurance', value: 'insurance' },
        { label: 'Oil & Gas', value: 'oil-gas' },
        { label: 'Cross-Industry', value: 'cross-industry' },
      ],
    },
    {
      name: 'regulatoryBody',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "HHS OCR", "EU Commission", "NAIC"' },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Optional short description or context' },
    },
    {
      name: 'recurring',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Deadline repeats — due date rolls forward automatically' },
    },
    {
      name: 'recurrenceType',
      type: 'select',
      options: [
        { label: 'Annual', value: 'annual' },
        { label: 'Quarterly', value: 'quarterly' },
      ],
      admin: {
        condition: (data) => Boolean(data?.recurring),
        description: 'How often this deadline recurs',
      },
    },
  ],
}
