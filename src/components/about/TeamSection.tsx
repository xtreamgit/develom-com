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
    bio: "Brings over 30 years of enterprise software sales acumen coupled with a decade of international startup business development expertise. His visionary leadership and unparalleled network of industry connections have been instrumental in propelling Develom to the forefront of AI solutions and application development.",
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
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-content">
        <p className="mb-3 text-label uppercase text-blue">THE TEAM</p>
        <h2 className="mb-10 text-[36px] font-bold text-navy">
          Meet the People Behind the Builds
        </h2>

        {/* Mobile: horizontal scroll carousel */}
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:hidden">
          {team.map((member) => (
            <div
              key={member.name}
              className="w-72 flex-shrink-0 snap-start rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <TeamCard member={member} />
            </div>
          ))}
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden grid-cols-3 gap-6 md:grid">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member }: { member: (typeof team)[0] }) {
  return (
    <>
      <img
        src={member.imageSrc}
        alt={member.name}
        className="mb-4 h-[120px] w-[120px] rounded-full object-cover"
      />
      <h3 className="text-[18px] font-semibold text-navy">{member.name}</h3>
      <p className="mt-0.5 text-[13px] font-semibold text-blue">{member.title}</p>
      <p className="mt-0.5 text-[13px] italic text-muted">{member.location}</p>
      <div className="my-4 border-t border-gray-100" />
      <p className="text-[14px] leading-[1.6] text-[#374151]">{member.bio}</p>
    </>
  )
}
