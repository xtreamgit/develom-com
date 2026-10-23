'use client'

import Image from 'next/image'
import { PRINCIPALS, AGENTS } from '@/lib/team-data'
import type { TeamMember } from '@/lib/team-data'

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group flex flex-col items-center rounded-xl border border-[#E5EAF2] bg-[#F8FAFC] p-5 text-center transition-all duration-200 hover:border-blue/30 hover:bg-white hover:shadow-md">
      <div className="relative mb-4 flex flex-col items-center gap-2">
        <Image
          src={member.avatar}
          alt={member.name}
          width={88}
          height={88}
          className="h-[88px] w-[88px] rounded-full border border-[#E5EAF2] object-cover"
        />
        {member.isAgent && (
          <span className="inline-flex items-center gap-1 rounded-full border border-blue/25 bg-blue/[0.07] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-blue before:h-[5px] before:w-[5px] before:rounded-full before:bg-blue before:content-['']">
            AI Agent
          </span>
        )}
      </div>
      <p className="text-[15px] font-semibold leading-tight text-navy">{member.name}</p>
      <p className="mt-0.5 text-[12px] text-[#6B7A99]">{member.role}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-[#9AA3B5]">
        <span>{member.location}</span>
        <span className="h-[3px] w-[3px] rounded-full bg-[#C5CDD9]" />
        <span>{member.languages.join(' · ')}</span>
      </div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-content">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
          The Team
        </p>
        <h2
          className="mb-14 text-navy"
          style={{ fontSize: 'clamp(1.625rem, 2.5vw + 0.5rem, 2.25rem)', fontWeight: 700, lineHeight: 1.25 }}
        >
          Meet the People Behind the Builds
        </h2>

        {/* People */}
        <div className="mb-10">
          <div className="mb-6 border-b border-[#E5EAF2] pb-3">
            <h3 className="text-[18px] font-bold text-navy">People</h3>
            <p className="text-[13px] text-[#9AA3B5]">Human principals and owners</p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {PRINCIPALS.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>

        {/* AI Agents */}
        <div>
          <div className="mb-6 border-b border-[#E5EAF2] pb-3">
            <h3 className="text-[18px] font-bold text-navy">AI Agents</h3>
            <p className="text-[13px] text-[#9AA3B5]">AI agents operating in functional business roles</p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {AGENTS.map((m) => (
              <MemberCard key={m.name + m.role} member={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
