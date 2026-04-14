import { getPayload } from 'payload'
import configPromise from '@payload-config'

const servicesSeeds = [
  // GROUP 1: AI Architecture & Systems Design
  {
    title: 'LLM Integration & RAG Pipeline Design',
    slug: 'rag-pipeline-design',
    serviceGroup: 'architecture' as const,
    tagline: 'Connect your data to large language models — securely and at scale.',
    description:
      'We design retrieval-augmented generation (RAG) pipelines that give your AI access to your own documents, databases, and knowledge bases. Built on Vertex AI, Cloud Run, and Weaviate — GCP-native from the ground up.',
    complianceAngle:
      'All pipelines include data isolation, access logging, and audit trail by default.',
    ctaLabel: 'Architect With Us',
    ctaUrl: '/contact',
    featured: true,
    status: 'published' as const,
    sortOrder: 1,
  },
  {
    title: 'Multi-Agent Orchestration',
    slug: 'multi-agent-orchestration',
    serviceGroup: 'architecture' as const,
    tagline: 'AI systems where multiple agents collaborate to complete complex tasks.',
    description:
      'Using Google ADK and LangGraph, we design multi-agent systems where specialized AI agents hand off work to each other — no human in the loop unless you want one. Built for regulated environments with explainability built in.',
    complianceAngle:
      'Every agent action is logged and traceable. Full explainability for compliance officers.',
    ctaLabel: 'Design Your System',
    ctaUrl: '/contact',
    featured: false,
    status: 'published' as const,
    sortOrder: 2,
  },
  {
    title: 'GCP-Native AI Infrastructure',
    slug: 'gcp-native-infrastructure',
    serviceGroup: 'architecture' as const,
    tagline: 'Zero-trust, IAM-first cloud infrastructure for your AI workloads.',
    description:
      'We architect on Google Cloud Platform from day one — Cloud Run, Cloud SQL, Vertex AI, Secret Manager. Zero-trust network design, DevSecOps CI/CD, and IAM-first access control are standard in every engagement.',
    complianceAngle:
      'Infrastructure your compliance officer can audit. Architecture documentation included.',
    ctaLabel: 'Build on GCP',
    ctaUrl: '/contact',
    featured: false,
    status: 'published' as const,
    sortOrder: 3,
  },
  // GROUP 2: AI Application Development
  {
    title: 'Agentic Web & Mobile Applications',
    slug: 'agentic-applications',
    serviceGroup: 'application' as const,
    tagline: 'Full-stack AI applications that act — not just respond.',
    description:
      'We build production-grade agentic applications end-to-end: backend APIs, frontend interfaces, and the AI layer connecting them. Documented for handoff, not just deployment. Built to HIPAA, AML/KYC, and GDPR standards from the start.',
    complianceAngle:
      'Built to HIPAA, AML/KYC, GDPR, CCPA, and FDA standards from the architecture layer.',
    ctaLabel: 'Start Building',
    ctaUrl: '/contact',
    featured: true,
    status: 'published' as const,
    sortOrder: 4,
  },
  {
    title: 'Voice AI for Regulated Industries',
    slug: 'voice-ai',
    serviceGroup: 'application' as const,
    tagline: 'Compliance-aware voice agents that handle real queries over phone and web.',
    description:
      'We build and deploy voice AI systems for healthcare intake, financial services IVR, and legal intake workflows. Voice AI that can verify caller identity, escalate correctly, and log every interaction for compliance review.',
    complianceAngle:
      'Every call logged. Escalation rules configurable. HIPAA-compliant call recording available.',
    ctaLabel: 'Explore Voice AI',
    ctaUrl: '/contact',
    featured: true,
    status: 'published' as const,
    sortOrder: 5,
  },
  // GROUP 3: Automation Solutioning
  {
    title: 'End-to-End Workflow Automation',
    slug: 'workflow-automation',
    serviceGroup: 'automation' as const,
    tagline: 'Replace manual compliance and data workflows with intelligent AI pipelines.',
    description:
      'We map your existing manual processes, identify automation opportunities, and deploy agentic pipelines that execute them — from document ingestion and extraction to multi-step approval chains. MLOps monitoring included.',
    complianceAngle:
      'Full audit trail on every automated action. Explainability built in, not bolted on.',
    ctaLabel: 'Automate Your Workflows',
    ctaUrl: '/contact',
    featured: true,
    status: 'published' as const,
    sortOrder: 6,
  },
  {
    title: 'MLOps & AI Operations',
    slug: 'mlops',
    serviceGroup: 'automation' as const,
    tagline:
      'Keep your AI running cleanly — monitoring, drift detection, and retraining pipelines.',
    description:
      'AI systems degrade without operational oversight. We set up model monitoring, data drift detection, and automated retraining pipelines so your AI systems stay accurate over time.',
    complianceAngle:
      'Monitoring dashboards designed for compliance review. Model versioning and rollback included.',
    ctaLabel: 'Operationalize Your AI',
    ctaUrl: '/contact',
    featured: false,
    status: 'published' as const,
    sortOrder: 7,
  },
]

async function seedServices(): Promise<void> {
  const payload = await getPayload({ config: configPromise })

  for (const service of servicesSeeds) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: service.slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({ collection: 'services', data: service })
      console.log(`Created service: ${service.title}`)
    } else {
      console.log(`Skipping (exists): ${service.title}`)
    }
  }

  console.log('Services seed complete.')
  process.exit(0)
}

seedServices().catch((err) => {
  console.error(err)
  process.exit(1)
})
