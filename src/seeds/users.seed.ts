import { getPayload } from 'payload'
import configPromise from '@payload-config'

type UserRole = 'admin' | 'editor' | 'author' | 'viewer'

const USERS: Array<{
  name: string
  email: string
  role: UserRole
  password: string
}> = [
  {
    name: 'Hector DeJesus',
    email: 'hector@develom.com',
    role: 'admin',
    password: process.env.SEED_USER_PASSWORD || 'ChangeMe123!',
  },
  {
    name: 'Robert Hughes',
    email: 'robert@develom.com',
    role: 'admin',
    password: process.env.SEED_USER_PASSWORD || 'ChangeMe123!',
  },
  {
    name: 'Mila Hughes',
    email: 'mila@develom.com',
    role: 'editor',
    password: process.env.SEED_USER_PASSWORD || 'ChangeMe123!',
  },
  {
    name: 'Neyda DeJesus',
    email: 'neyda@develom.com',
    role: 'author',
    password: process.env.SEED_USER_PASSWORD || 'ChangeMe123!',
  },
]

export async function seedUsers() {
  const payload = await getPayload({ config: configPromise })

  for (const user of USERS) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: user.email } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      // Update role in case it changed
      await payload.update({
        collection: 'users',
        id: existing.docs[0].id,
        data: { role: user.role, name: user.name },
      })
      console.log(`  → Updated: ${user.name} (${user.role})`)
      continue
    }

    await payload.create({
      collection: 'users',
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
      },
    })
    console.log(`  ✓ Created: ${user.name} — ${user.email} (${user.role})`)
  }

  console.log('\nUsers seed complete.')
  console.log('⚠  Default password is "ChangeMe123!" — update immediately or set SEED_USER_PASSWORD env var.')
}

const _isMain = import.meta.url === `file://${process.argv[1]}`
if (_isMain) {
  seedUsers()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
