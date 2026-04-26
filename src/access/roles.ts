import type { Access, FieldAccess } from 'payload'

type UserWithRole = { id: number | string; role?: string }

export const hasRole = (user: unknown, role: string | string[]): boolean => {
  if (!user) return false
  const u = user as UserWithRole
  const roles = Array.isArray(role) ? role : [role]
  return roles.includes(u.role ?? '')
}

/** Full admin access only */
export const isAdmin: Access = ({ req: { user } }) => {
  return hasRole(user, 'admin')
}

/** Admin or editor */
export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor'])
}

/** Admin can update anyone; others can only update themselves */
export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (hasRole(user, 'admin')) return true
  if (!user) return false
  return { id: { equals: (user as UserWithRole).id } }
}

/** Admin, editor, and author can create content */
export const canCreate: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor', 'author'])
}

/** Any authenticated user can read */
export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}

/**
 * Admin/editor can update anything.
 * Author can only update their own documents.
 * Viewer cannot update.
 */
export const canUpdate: Access = ({ req: { user } }) => {
  if (hasRole(user, ['admin', 'editor'])) return true
  if (hasRole(user, 'author')) {
    return { createdBy: { equals: (user as UserWithRole).id } }
  }
  return false
}

/** Only admin can delete */
export const canDelete: Access = ({ req: { user } }) => {
  return hasRole(user, 'admin')
}

/** Field-level: only admin and editor can set published = true */
export const canPublish: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor'])
}

/** Field-level: only admin can update this field */
export const isAdminField: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'admin')
}
