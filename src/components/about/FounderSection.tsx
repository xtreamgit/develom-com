const credentials = [
  'Google Cloud Professional Architect',
  '33 Years IT Engineering & Security',
  'AI & Machine Learning Certified',
  'GCP-Native Architecture Specialist',
  'DevSecOps & Zero-Trust Design',
  'HIPAA · AML/KYC · GDPR Systems',
]

export default function FounderSection() {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[960px]">
        <p className="mb-12 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
          Founder
        </p>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[280px_1fr]">
          {/* Left: portrait + name + credentials */}
          <div className="flex flex-col items-start">
            <img
              src="/team/hector.svg"
              alt="Hector DeJesus"
              className="h-44 w-44 rounded-full object-cover"
            />
            <h2 className="mt-6 text-[28px] font-bold tracking-tight text-navy">
              Hector DeJesus
            </h2>
            <p className="mt-1 text-[15px] font-semibold text-blue">Founder &amp; CTO</p>

            {/* Credential list */}
            <ul className="mt-8 flex flex-col gap-2.5">
              {credentials.map((cred) => (
                <li
                  key={cred}
                  className="flex items-start gap-2.5 text-[13px] font-medium leading-snug text-navy/80"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-blue"
                  >
                    <path
                      d="M13.5 4.5L6.5 11.5L2.5 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {cred}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: bio + pull quote */}
          <div className="flex flex-col justify-center">
            <p className="text-[17px] leading-[1.8] text-text">
              Hector brings 33 years of IT system engineering, networking, and security experience to
              every Develom engagement. He holds the Google Cloud Professional Architect
              certification and has completed advanced training in Artificial Intelligence and Machine
              Learning.
            </p>

            <blockquote className="my-10 rounded-lg bg-[#F8FAFC] px-8 py-7">
              <p className="text-[18px] font-medium italic leading-[1.7] text-navy">
                &ldquo;The AI firms that will matter in regulated industries aren&apos;t the ones
                with the biggest teams. They&apos;re the ones that understood the compliance
                requirements before they wrote the first line of code.&rdquo;
              </p>
            </blockquote>

            <p className="text-[17px] leading-[1.8] text-text">
              Develom&apos;s systems reflect that background: zero-trust by default, cloud-native
              from the start, and documented for the compliance officer as well as the developer.
              When you work with Develom, you work directly with Hector — not a project manager
              handing off to an offshore team.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
