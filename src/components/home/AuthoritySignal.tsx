import Link from 'next/link'

const credentials = [
  'Google Cloud Professional Architect',
  '33 Years IT Engineering, Networking & Security',
  'AI & Machine Learning Certified',
  'GCP-Native Architecture Specialist',
  'DevSecOps & Zero-Trust Design',
]

export default function AuthoritySignal() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[800px]">
        <p className="text-label uppercase text-blue">WHY DEVELOM</p>

        <h2 className="mt-3 text-h2 text-navy">
          33 Years of IT Engineering. Now Applied to AI.
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-text">
          Hector brings 33 years of IT system engineering, networking, and security experience to every Develom engagement. He holds the Google Cloud Professional Architect certification and has completed advanced training in Artificial Intelligence and Machine Learning.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-text">
          Develom{'\u2019'}s builds reflect that background: zero-trust by default, cloud-native from the start, and documented for the compliance officer, not just the developer.
        </p>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {credentials.map((cred) => (
            <div
              key={cred}
              className="flex items-start gap-3 rounded border border-[#E2E8F0] bg-bg-alt px-5 py-3.5 hover:border-blue transition-colors"
            >
              <span className="text-[16px] font-bold text-blue" aria-hidden="true">
                &#10003;
              </span>
              <span className="text-[15px] font-semibold text-navy">{cred}</span>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-8 inline-block text-[16px] font-semibold text-blue hover:underline"
        >
          Read Hector{'\u2019'}s full background &rarr;
        </Link>
      </div>
    </section>
  )
}
