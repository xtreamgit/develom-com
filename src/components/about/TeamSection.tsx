'use client'

const team = [
  {
    imageSrc: '/team/hector.svg',
    name: 'Hector DeJesus',
    title: 'Founder & CTO',
    location: 'Los Angeles, California',
    bio: 'Our esteemed CTO and senior technical lead, brings a wealth of knowledge garnered from 10 years at Accenture, where he spearheaded the development of enterprise cloud solutions on AWS and Google Cloud Platform. As a MIT certified Designer and Implementer of AI Products and Services at Develom, he now applies his deep technical acumen to architect cutting-edge AI solutions, setting the strategic technology direction that keeps us at the forefront of innovation.',
  },
  {
    imageSrc: '/team/robert.svg',
    name: 'Robert Hughes',
    title: 'VP of Business Development & COO',
    location: 'Los Angeles, California',
    bio: 'Brings over 30 years of enterprise software sales acumen coupled with a decade of international startup business development expertise. His visionary leadership and unparalleled network of industry connections have been instrumental in propelling Develom to the forefront of AI solutions and application development.',
  },
  {
    imageSrc: '/team/carla.svg',
    name: 'Carla Pulido',
    title: 'UX/UI & Brand Graphic Designer',
    location: 'Argentina',
    bio: "Develom's lead UX/UI designer and artist, masterfully bridges the gap between functionality and aesthetics to create seamless user experiences across our platform. With a keen eye for design and a strong grasp of branding, she plays a pivotal role in defining the visual identity that makes Develom's AI products both intuitive and engaging.",
  },
  {
    imageSrc: '/team/aaron.svg',
    name: 'Aaron Osorio',
    title: 'Back-End Developer & Scrum Master',
    location: 'Mexico',
    bio: "Develom's versatile Scrum Master and Backend Developer, excels at fostering agile methodologies to streamline project workflows while simultaneously crafting intuitive user interfaces. His unique blend of organizational and creative skills makes him invaluable in both planning sprints and optimizing user experience.",
  },
  {
    imageSrc: '/team/breyner.svg',
    name: 'Breyner Parada',
    title: 'Front-End Developer & UX Designer',
    location: 'United States',
    bio: "A Junior UX/UI and Front-End Developer at Develom, combines intuitive design sensibilities with coding prowess to create seamless and visually captivating user experiences. Passionate about emerging technologies, he continually integrates the latest design trends to ensure that Develom's AI products are both user-friendly and cutting-edge.",
  },
]

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

        {/* Mobile: horizontal scroll carousel with snap */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:hidden">
          {team.map((member) => (
            <div
              key={member.name}
              className="w-[280px] flex-shrink-0 snap-start"
            >
              <TeamCard member={member} />
            </div>
          ))}
          {/* Spacer for right padding in scroll */}
          <div className="w-2 flex-shrink-0" />
        </div>

        {/* Desktop: grid — 3 top, 2 bottom centered */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {team.slice(0, 3).map((member) => (
            <div key={member.name}>
              <TeamCard member={member} />
            </div>
          ))}
        </div>
        {team.length > 3 && (
          <div className="mt-6 hidden justify-center gap-6 md:flex">
            {team.slice(3).map((member) => (
              <div key={member.name} className="w-full max-w-[calc((100%-1.5rem)/3)]">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function TeamCard({ member }: { member: (typeof team)[0] }) {
  return (
    <div className="group flex h-full flex-col rounded-lg bg-[#F8FAFC] p-6 transition-all duration-200 hover:bg-white hover:shadow-md">
      <img
        src={member.imageSrc}
        alt={member.name}
        className="mb-5 h-[100px] w-[100px] rounded-full object-cover"
      />
      <h3 className="text-[17px] font-bold text-navy">{member.name}</h3>
      <p className="mt-1 text-[13px] font-semibold text-blue">{member.title}</p>
      <p className="mt-0.5 text-[13px] italic text-muted">{member.location}</p>
      <p className="mt-4 text-[14px] leading-[1.7] text-[#374151]">{member.bio}</p>
    </div>
  )
}
