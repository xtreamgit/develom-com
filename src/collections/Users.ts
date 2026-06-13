import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf, isAdminField } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true,
    maxLoginAttempts: 0,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'lastLogin'],
    group: 'System',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Full name — displayed in admin panel' },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'author',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
        { label: 'Viewer', value: 'viewer' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Determines what this user can do in the CMS',
      },
      access: {
        update: isAdminField,
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Profile photo — uses the avatar image size (200×200)' },
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Auto-updated on login',
      },
    },
  ],
}
