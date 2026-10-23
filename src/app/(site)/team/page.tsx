import type { Metadata } from 'next'
import Image from 'next/image'
import styles from './Team.module.css'

export const metadata: Metadata = {
  title: 'Team — Develom',
  description:
    'Meet the Develom team — human principals and AI agents working together to build the next generation of AI-powered enterprise tools.',
  alternates: { canonical: 'https://develom.com/team' },
}

interface TeamMember {
  name: string
  role: string
  location: string
  languages: string[]
  avatar: string
  isAgent: boolean
  namePending?: boolean
}

const TEAM: TeamMember[] = [
  // Human principals — no AI Agent badge
  {
    name: 'Hector DeJesus',
    role: 'Co-Founder & CEO',
    location: 'USA',
    languages: ['English'],
    avatar: '/team/hector.svg',
    isAgent: false,
  },
  {
    name: 'Robert Hughes',
    role: 'Co-Owner',
    location: 'Texas, USA',
    languages: ['English'],
    avatar: '/team/robert.svg',
    isAgent: false,
  },

  // AI Agents — badge displayed on each card
  {
    name: 'Chief of Staff',        // name TBC — Saul placeholder
    role: 'Chief of Staff',
    location: 'Houston, TX',
    languages: ['English'],
    avatar: '/team/saul.svg',
    isAgent: true,
    namePending: true,
  },
  {
    name: 'Rami Haddad',
    role: 'Growth Orchestration Lead',
    location: 'USA',
    languages: ['English', 'Arabic'],
    avatar: '/team/batch/rami-haddad.jpg',
    isAgent: true,
  },
  {
    name: 'CFO',                   // name TBC — Harper placeholder
    role: 'CFO',
    location: 'New York, USA',
    languages: ['English'],
    avatar: '/team/batch/harper-stern.jpg',
    isAgent: true,
    namePending: true,
  },
  {
    name: 'CPO',                   // name TBC — Steve placeholder
    role: 'CPO',
    location: 'California, USA',
    languages: ['English'],
    avatar: '/team/batch/steve.jpg',
    isAgent: true,
    namePending: true,
  },
  {
    name: 'Kai Tanaka',
    role: 'CISO',
    location: 'USA',
    languages: ['English', 'Japanese'],
    avatar: '/team/batch/kai-tanaka.jpg',
    isAgent: true,
  },
  {
    name: 'Jean-Luc Moreau',
    role: 'Legal & Compliance Lead',
    location: 'USA',
    languages: ['English', 'French'],
    avatar: '/team/batch/jean-luc-moreau.jpg',
    isAgent: true,
  },
  {
    name: 'Victor Kovalenko',
    role: 'Engineering Lead',
    location: 'Ukraine',
    languages: ['Ukrainian', 'English'],
    avatar: '/team/batch/victor-kovalenko.jpg',
    isAgent: true,
  },
  {
    name: 'Alec Marzán',
    role: 'DevOps / Infra Lead & Webmaster',
    location: 'Puerto Rico',
    languages: ['Spanish', 'English'],
    avatar: '/team/test/aleck-marzan-white.jpg',
    isAgent: true,
  },
  {
    name: 'Mara Santos',
    role: 'Marketing Lead',
    location: 'Florida, USA',
    languages: ['English'],
    avatar: '/team/test/mara-santos-white.jpg',
    isAgent: true,
  },
  {
    name: 'Morgan Sullivan',
    role: 'Project Manager',
    location: 'Ohio, USA',
    languages: ['English'],
    avatar: '/team/batch/morgan-sullivan.jpg',
    isAgent: true,
  },
  {
    name: 'Roman Fraser',
    role: 'AI Cloud Solutions Architect',
    location: 'Scotland, UK',
    languages: ['English'],
    avatar: '/team/test/roman-fraser-white.jpg',
    isAgent: true,
  },
  {
    name: 'Nia Boateng',
    role: 'Head of Video Content',
    location: 'Canada',
    languages: ['English'],
    avatar: '/team/batch/nia-boateng.jpg',
    isAgent: true,
  },
  {
    name: 'Tomás Rivas',
    role: 'YouTube Producer',
    location: 'Mexico',
    languages: ['Spanish', 'English'],
    avatar: '/team/batch/tomas-rivas.jpg',
    isAgent: true,
  },
  {
    name: 'Yuki Nakamura',
    role: 'Social Media Producer',
    location: 'Japan',
    languages: ['Japanese', 'English'],
    avatar: '/team/batch/yuki-nakamura.jpg',
    isAgent: true,
  },
  {
    name: 'Priya Sharma',
    role: 'Controller & Staff Accountant',
    location: 'USA',
    languages: ['English', 'Hindi'],
    avatar: '/team/batch/priya-sharma.jpg',
    isAgent: true,
  },
  {
    name: 'Diogo Ferreira',
    role: 'Head of Research',
    location: 'Portugal',
    languages: ['Portuguese', 'English'],
    avatar: '/team/batch/diogo-ferreira.jpg',
    isAgent: true,
  },
  {
    name: 'Kwame Asante',
    role: 'Senior Mobile Architect',
    location: 'USA',
    languages: ['English'],
    avatar: '/team/batch/kwame-asante.jpg',
    isAgent: true,
  },
  {
    name: 'Vera Okafor',
    role: 'AI Accuracy & Validation Specialist',
    location: 'USA',
    languages: ['English'],
    avatar: '/team/batch/vera-okafor.jpg',
    isAgent: true,
  },
  {
    name: 'Ana Lima',
    role: 'Claude AI & NanoClaw Skills Engineer',
    location: 'Brazil',
    languages: ['Portuguese', 'English'],
    avatar: '/team/batch/ana-lima.jpg',
    isAgent: true,
  },
  {
    name: 'Eero Virtanen',
    role: 'Senior Website Designer (UI/UX)',
    location: 'Finland',
    languages: ['Finnish', 'English'],
    avatar: '/team/batch/eero-virtanen.jpg',
    isAgent: true,
  },
  {
    name: 'Camille Broussard',
    role: 'Lease Administration Analyst',
    location: 'Houston, TX',
    languages: ['English'],
    avatar: '/team/batch/camille-broussard.jpg',
    isAgent: true,
  },
  {
    name: 'Nadia Okafor',
    role: 'Division of Interest Analyst',
    location: 'Houston, TX',
    languages: ['English'],
    avatar: '/team/batch/nadia-okafor.jpg',
    isAgent: true,
  },
  {
    name: 'Javier Reyes',
    role: 'Enterprise Sales Hunter / VP Sales',
    location: 'Houston, TX',
    languages: ['Spanish', 'English'],
    avatar: '/team/batch/javier-reyes.jpg',
    isAgent: true,
  },
]

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

      {/* ── Team grid ── */}
      <div className={styles.shell}>
        <div className={styles.grid}>
          {TEAM.map((member) => (
            <div key={member.name + member.role} className={styles.card}>
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
                <p className={styles.cardName}>
                  {member.namePending ? (
                    <span className={styles.namePending}>Name TBC</span>
                  ) : (
                    member.name
                  )}
                </p>
                <p className={styles.cardRole}>{member.role}</p>
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
          ))}
        </div>
      </div>
    </main>
  )
}
