import type { Metadata } from 'next'
import Image from 'next/image'
import styles from './Team.module.css'
import { PRINCIPALS, AGENTS } from '@/lib/team-data'
import type { TeamMember } from '@/lib/team-data'

export const metadata: Metadata = {
  title: 'Team — Develom',
  description:
    'Meet the Develom team — human principals and AI agents working together to build the next generation of AI-powered enterprise tools.',
  alternates: { canonical: 'https://develom.com/team' },
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrap}>
        <Image
          src={member.avatar}
          alt={member.namePending ? member.role : member.name}
          width={100}
          height={100}
          className={styles.avatar}
        />
        {member.isAgent && (
          <span className={styles.agentBadge}>AI Agent</span>
        )}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardName}>{member.name}</p>
        <p className={styles.cardRole}>{member.role}</p>
        {member.note && (
          <p className={styles.cardNote}>{member.note}</p>
        )}
        <div className={styles.cardMeta}>
          <span className={styles.metaItem}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M5.5 1C3.57 1 2 2.57 2 4.5c0 2.72 3.5 6 3.5 6S9 7.22 9 4.5C9 2.57 7.43 1 5.5 1zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill="currentColor"/>
            </svg>
            {member.location}
          </span>
          <span className={styles.metaDot} />
          <span className={styles.metaItem}>{member.languages.join(' · ')}</span>
        </div>
      </div>
    </div>
  )
}

export default function TeamPage() {
  return (
    <main className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.headerEyebrow}>Who We Are</p>
          <h1 className={styles.headerTitle}>Our Team</h1>
          <p className={styles.headerSub}>
            Develom operates at the frontier of AI automation — combining human leadership with
            AI agents in functional business roles.
          </p>
        </div>
      </div>

      {/* ── Governance statement (EU AI Act Article 50) ── */}
      <div className={styles.governanceBanner}>
        <div className={styles.governanceInner}>
          <svg className={styles.governanceIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M9 8v5M9 6v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <p className={styles.governanceText}>
            AI agents at Develom operate in functional roles. Corporate officer responsibilities,
            legal signing authority, and fiduciary duties are held by Develom&apos;s human principals.
          </p>
        </div>
      </div>

      {/* ── Team sections ── */}
      <div className={styles.shell}>

        {/* People section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>People</h2>
            <p className={styles.sectionSub}>Human principals and owners</p>
          </div>
          <div className={`${styles.grid} ${styles.gridPrincipals}`}>
            {PRINCIPALS.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* AI Agents section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>AI Agents</h2>
            <p className={styles.sectionSub}>AI agents operating in functional business roles</p>
          </div>
          <div className={styles.grid}>
            {AGENTS.map((member) => (
              <MemberCard key={member.name + member.role} member={member} />
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
