import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { AdminViewServerProps } from 'payload'

const DASHBOARD_STYLES = `
  .dvlm-activity-link:hover { background: #F8FAFC !important; }
  .dvlm-nav-link:hover { background: rgba(37,99,235,0.07) !important; color: #2563EB !important; }
  .dvlm-nav-link:hover .dvlm-nav-icon { color: #2563EB !important; }
`

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Role = 'admin' | 'editor' | 'author' | 'viewer'

interface ActivityItem {
  collection: string
  collectionLabel: string
  title: string
  updatedAt: string
  editUrl: string
}

interface NavSection {
  heading: string
  items: { label: string; href: string; icon: React.ReactNode }[]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 2) return 'just now'
  if (mins < 60) return `${mins} minutes ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} ${hrs === 1 ? 'hour' : 'hours'} ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days} ${days === 1 ? 'day' : 'days'} ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const ROLE_BADGE: Record<Role, { label: string; bg: string; color: string }> = {
  admin:  { label: 'Admin',  bg: '#EFF6FF', color: '#2563EB' },
  editor: { label: 'Editor', bg: '#F0FDF4', color: '#10B981' },
  author: { label: 'Author', bg: '#FFFBEB', color: '#F59E0B' },
  viewer: { label: 'Viewer', bg: '#F8FAFC', color: '#64748B' },
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const ico = {
  dashboard:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  blog:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  page:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  portfolio:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  services:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M2 12h2M20 12h2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41"/></svg>,
  caseStudy:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  testimonial:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h2c1.25 0 2 .75 2 2 0 1.25-.75 2-2 2H3"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h2c1.25 0 2 .75 2 2 0 1.25-.75 2-2 2h-2"/></svg>,
  tag:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  category:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  media:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  folder:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  users:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  nav:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  settings:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  account:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  social:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03A12.83 12.83 0 0 1 2.4.89a4.52 4.52 0 0 0 1.4 6.03A4.47 4.47 0 0 1 1.76 6v.06c0 2.19 1.56 4.02 3.63 4.43a4.53 4.53 0 0 1-2.04.08 4.52 4.52 0 0 0 4.22 3.14A9.07 9.07 0 0 1 1 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.18 9.18 0 0 0 23 3z"/></svg>,
  fileText:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  briefcase:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  image:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  layout:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  barChart:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  quote:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h2c1.25 0 2 .75 2 2 0 1.25-.75 2-2 2H3"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h2c1.25 0 2 .75 2 2 0 1.25-.75 2-2 2h-2"/></svg>,
}

// ---------------------------------------------------------------------------
// Nav Panel
// ---------------------------------------------------------------------------

function NavPanel({ sections }: { sections: NavSection[] }) {
  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        background: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: 12,
        padding: '8px 0',
        alignSelf: 'flex-start',
        position: 'sticky',
        top: 24,
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      {sections.map((section, si) => (
        <div key={section.heading} style={{ marginBottom: si < sections.length - 1 ? 4 : 0 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#94A3B8',
              padding: '10px 16px 4px',
              margin: 0,
            }}
          >
            {section.heading}
          </p>
          {section.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="dvlm-nav-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '7px 16px',
                textDecoration: 'none',
                color: '#374151',
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 6,
                margin: '1px 6px',
                transition: 'background 0.1s, color 0.1s',
              }}
            >
              <span
                className="dvlm-nav-icon"
                style={{ color: '#94A3B8', flexShrink: 0, display: 'flex', transition: 'color 0.1s' }}
              >
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
          {si < sections.length - 1 && (
            <div style={{ height: 1, background: '#F1F5F9', margin: '6px 16px' }} />
          )}
        </div>
      ))}
    </aside>
  )
}

// ---------------------------------------------------------------------------
// Stat + action sub-components
// ---------------------------------------------------------------------------

function StatCard({ label, count, icon }: { label: string; count: number; icon: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '20px 20px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ color: '#2563EB', width: 22, height: 22 }}>{icon}</div>
      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 28, fontWeight: 600, color: '#0D1B2A', lineHeight: 1 }}>{count}</div>
      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  )
}

function ActionButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#2563EB', color: '#fff', borderRadius: 8, padding: '9px 16px', fontSize: 13, fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
      <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
      {label}
    </a>
  )
}

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: ok ? '#F0FDF4' : '#FEF9C3', color: ok ? '#166534' : '#854D0E', borderRadius: 6, padding: '4px 10px', fontSize: 12, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: ok ? '#22C55E' : '#EAB308', flexShrink: 0 }} />
      {label}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

export default async function Dashboard({ initPageResult }: AdminViewServerProps) {
  const user = initPageResult?.req?.user as { name?: string; role?: string } | undefined
  const role = (user?.role ?? 'viewer') as Role
  const userName = user?.name ?? 'there'

  const payload = await getPayload({ config: configPromise })

  const [posts, projects, mediaFiles, pages, caseStudies, testimonials, socialDrafts] = await Promise.all([
    payload.count({ collection: 'blog-posts' }),
    payload.count({ collection: 'portfolio-projects' }),
    payload.count({ collection: 'media' }),
    payload.count({ collection: 'pages' }),
    payload.count({ collection: 'case-studies' }),
    payload.count({ collection: 'testimonials' }),
    payload.count({ collection: 'social-posts', where: { status: { in: ['draft', 'pending-review'] } } }).catch(() => ({ totalDocs: 0 })),
  ])

  const [recentPosts, recentPages, recentCases, recentMedia] = await Promise.all([
    payload.find({ collection: 'blog-posts',    sort: '-updatedAt', limit: 3, depth: 0 }),
    payload.find({ collection: 'pages',         sort: '-updatedAt', limit: 3, depth: 0 }),
    payload.find({ collection: 'case-studies',  sort: '-updatedAt', limit: 2, depth: 0 }),
    payload.find({ collection: 'media',         sort: '-updatedAt', limit: 2, depth: 0 }),
  ])

  const activity: ActivityItem[] = [
    ...recentPosts.docs.map((d) => ({ collection: 'blog-posts',   collectionLabel: 'Blog',       title: (d as { title?: string }).title    ?? 'Untitled', updatedAt: d.updatedAt, editUrl: `/admin/collections/blog-posts/${d.id}` })),
    ...recentPages.docs.map((d) => ({ collection: 'pages',        collectionLabel: 'Page',       title: (d as { title?: string }).title    ?? 'Untitled', updatedAt: d.updatedAt, editUrl: `/admin/collections/pages/${d.id}` })),
    ...recentCases.docs.map((d) => ({ collection: 'case-studies', collectionLabel: 'Case Study', title: (d as { title?: string }).title    ?? 'Untitled', updatedAt: d.updatedAt, editUrl: `/admin/collections/case-studies/${d.id}` })),
    ...recentMedia.docs.map((d) => ({ collection: 'media',        collectionLabel: 'Media',      title: (d as { alt?: string; filename?: string }).alt ?? (d as { filename?: string }).filename ?? 'Untitled', updatedAt: d.updatedAt, editUrl: `/admin/collections/media/${d.id}` })),
  ]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10)

  const badge      = ROLE_BADGE[role] ?? ROLE_BADGE.viewer
  const canCreate  = role === 'admin' || role === 'editor' || role === 'author'
  const isAdmin    = role === 'admin'
  const showAllActions = role === 'admin' || role === 'editor'
  const hasBlobToken   = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  const isProd         = process.env.NODE_ENV === 'production'
  const vercelUrl      = process.env.VERCEL_URL

  // ── Nav sections ──────────────────────────────────────────────────────────
  const navSections: NavSection[] = [
    {
      heading: 'Main',
      items: [
        { label: 'Dashboard',  href: '/admin',          icon: ico.dashboard },
        { label: 'My Account', href: '/admin/account',  icon: ico.account  },
      ],
    },
    {
      heading: 'Content',
      items: [
        { label: 'Blog Posts',          href: '/admin/collections/blog-posts',          icon: ico.blog       },
        { label: 'Pages',               href: '/admin/collections/pages',               icon: ico.page       },
        { label: 'Portfolio Projects',  href: '/admin/collections/portfolio-projects',  icon: ico.portfolio  },
        { label: 'Services',            href: '/admin/collections/services',            icon: ico.services   },
        { label: 'Case Studies',        href: '/admin/collections/case-studies',        icon: ico.caseStudy  },
        { label: 'Testimonials',        href: '/admin/collections/testimonials',        icon: ico.testimonial},
      ],
    },
    {
      heading: 'Taxonomy',
      items: [
        { label: 'Tags',       href: '/admin/collections/tags',       icon: ico.tag      },
        { label: 'Categories', href: '/admin/collections/categories', icon: ico.category },
      ],
    },
    {
      heading: 'Media',
      items: [
        { label: 'Media Library', href: '/admin/collections/media',         icon: ico.media  },
        { label: 'Folders',       href: '/admin/collections/media-folders', icon: ico.folder },
      ],
    },
    {
      heading: 'Marketing',
      items: [
        { label: 'Social Posts', href: '/admin/collections/social-posts', icon: ico.social },
      ],
    },
    ...(isAdmin ? [{
      heading: 'Users',
      items: [
        { label: 'Users', href: '/admin/collections/users', icon: ico.users },
      ],
    }] : []),
    {
      heading: 'Settings',
      items: [
        { label: 'Navigation',    href: '/admin/globals/navigation',    icon: ico.nav      },
        { label: 'Site Settings', href: '/admin/globals/site-settings', icon: ico.settings },
      ],
    },
  ]

  const sectionHeading: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: '#94A3B8', marginBottom: 14,
  }

  return (
    <div style={{ padding: '32px 32px 48px', fontFamily: 'DM Sans, sans-serif' }}>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: DASHBOARD_STYLES }} />

      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

        {/* ── Left nav panel ── */}
        <NavPanel sections={navSections} />

        {/* ── Main content ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Welcome header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0D1B2A', margin: 0, lineHeight: 1.2 }}>
                Welcome back, {userName}
              </h1>
              <span style={{ background: badge.bg, color: badge.color, borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {badge.label}
              </span>
            </div>
            <p style={{ marginTop: 6, fontSize: 14, color: '#64748B' }}>
              Here&apos;s what&apos;s happening in Develom CMS
            </p>
          </div>

          {/* Stat cards */}
          <div style={{ marginBottom: 32 }}>
            <p style={sectionHeading}>Content Overview</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
              <StatCard label="Blog Posts"   count={posts.totalDocs}        icon={ico.fileText}  />
              <StatCard label="Portfolio"    count={projects.totalDocs}     icon={ico.briefcase} />
              <StatCard label="Media Files"  count={mediaFiles.totalDocs}   icon={ico.image}     />
              <StatCard label="Pages"        count={pages.totalDocs}        icon={ico.layout}    />
              <StatCard label="Case Studies" count={caseStudies.totalDocs}  icon={ico.barChart}  />
              <StatCard label="Testimonials" count={testimonials.totalDocs} icon={ico.quote}     />
              {socialDrafts.totalDocs > 0 && (
                <StatCard label="Social Drafts" count={socialDrafts.totalDocs} icon={ico.social} />
              )}
            </div>
          </div>

          {/* Quick actions */}
          {canCreate && (
            <div style={{ marginBottom: 32 }}>
              <p style={sectionHeading}>Quick Actions</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <ActionButton href="/admin/collections/blog-posts/create"   label="New Blog Post"   />
                <ActionButton href="/admin/collections/media/create"        label="Upload Media"    />
                <ActionButton href="/admin/collections/pages/create"        label="Create Page"     />
                {showAllActions && (
                  <ActionButton href="/admin/collections/case-studies/create" label="Add Case Study" />
                )}
              </div>
            </div>
          )}

          {/* Recent activity */}
          <div style={{ marginBottom: 32 }}>
            <p style={sectionHeading}>Recent Activity</p>
            {activity.length === 0 ? (
              <p style={{ fontSize: 14, color: '#94A3B8' }}>No recent activity yet.</p>
            ) : (
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                {activity.map((item, i) => (
                  <a
                    key={`${item.collection}-${i}`}
                    href={item.editUrl}
                    className="dvlm-activity-link"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      gap: 16, padding: '13px 18px',
                      borderBottom: i < activity.length - 1 ? '1px solid #F1F5F9' : 'none',
                      textDecoration: 'none', transition: 'background 0.1s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2563EB', background: '#EFF6FF', borderRadius: 4, padding: '2px 7px', flexShrink: 0 }}>
                        {item.collectionLabel}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: '#0D1B2A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.title}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: '#94A3B8', flexShrink: 0, fontFamily: 'DM Mono, monospace' }}>
                      {relativeTime(item.updatedAt)}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* System status (admin only) */}
          {isAdmin && (
            <div>
              <p style={sectionHeading}>System Status</p>
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '16px 18px', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <StatusBadge ok={true}          label="Database: Connected" />
                <StatusBadge ok={hasBlobToken}  label={hasBlobToken ? 'Blob Storage: Configured' : 'Blob Storage: Token missing'} />
                <StatusBadge ok={isProd}        label={isProd ? 'Environment: Production' : 'Environment: Development'} />
                {vercelUrl && (
                  <a href={`https://${vercelUrl}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12, color: '#2563EB', fontFamily: 'DM Mono, monospace', textDecoration: 'none' }}>
                    {vercelUrl}
                  </a>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
