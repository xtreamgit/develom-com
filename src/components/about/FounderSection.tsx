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
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[900px]">
        <p className="mb-8 text-label uppercase text-blue">FOUNDER</p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: portrait + credentials */}
          <div className="flex flex-col items-start gap-8">
            {/* Portrait */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <img
                src="/team/hector.svg"
                alt="Hector DeJesus"
                className="h-40 w-40 flex-shrink-0 rounded-full border-2 border-[#E2E8F0]"
              />
              <div className="sm:pt-2">
                <h2 className="text-[32px] font-bold text-navy">Hector DeJesus</h2>
                <p className="mt-1 text-[16px] font-semibold text-blue">Founder & CTO</p>
              </div>
            </div>

            {/* Credential badges */}
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              {credentials.map((cred) => (
                <div
                  key={cred}
                  className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-bg-alt px-4 py-3 transition-colors hover:border-blue-500"
                >
                  <span className="text-[14px] font-semibold text-blue">✓</span>
                  <span className="text-[14px] font-semibold text-navy">{cred}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bio + pull quote */}
          <div className="flex flex-col justify-center">
            <p className="text-[17px] leading-[1.7] text-text">
              Hector brings 33 years of IT system engineering, networking, and security experience to
              every Develom engagement. He holds the Google Cloud Professional Architect
              certification and has completed advanced training in Artificial Intelligence and Machine
              Learning.
            </p>

            <blockquote className="my-7 border-l-4 border-blue-500 pl-5 text-[18px] font-semibold italic text-blue">
              &ldquo;The AI firms that will matter in regulated industries aren&apos;t the ones with
              the biggest teams. They&apos;re the ones that understood the compliance requirements
              before they wrote the first line of code.&rdquo;
            </blockquote>

            <p className="text-[17px] leading-[1.7] text-text">
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
