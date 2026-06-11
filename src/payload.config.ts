import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { MediaFolders } from './collections/MediaFolders'
import { BlogPosts } from './collections/BlogPosts'
import { PortfolioProjects } from './collections/PortfolioProjects'
import { Services } from './collections/Services'
import { Tags } from './collections/Tags'
import { Categories } from './collections/Categories'
import { Pages } from './collections/Pages'
import { Testimonials } from './collections/Testimonials'
import { CaseStudies } from './collections/CaseStudies'
import { Leads } from './collections/Leads'
import { Interviews } from './collections/Interviews'
import { LatestModels } from './collections/LatestModels'
import { ComplianceDeadlines } from './collections/ComplianceDeadlines'
import { SocialPosts } from './collections/SocialPosts'
import { Navigation } from './globals/Navigation'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Develom CMS',
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo',
        Icon: '@/components/admin/Icon',
      },
      header: ['@/components/admin/AdminStyles'],
      views: {
        dashboard: {
          Component: '@/components/admin/Dashboard',
        },
      },
    },
  },
  collections: [Users, Media, MediaFolders, BlogPosts, PortfolioProjects, Services, Tags, Categories, Pages, Testimonials, CaseStudies, Leads, Interviews, LatestModels, ComplianceDeadlines, SocialPosts],
  globals: [Navigation, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || 'noreply@develom.com',
    defaultFromName: 'Develom',
    transportOptions: process.env.SMTP_HOST
      ? {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        }
      : {
          streamTransport: true,
          newline: 'unix',
          buffer: true,
        },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: process.env.NODE_ENV === 'production',
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      clientUploads: true,
      collections: {
        media: true,
      },
    }),
  ],
})
