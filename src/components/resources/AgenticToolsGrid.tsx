import Link from 'next/link'

interface Tool {
  name: string
  tagline: string
  description: string
  stages: string[]
  useItWhen: string
  link: string
  linkLabel: string
}

const STAGE_CLASS: Record<string, string> = {
  Design: 'border border-blue/25 bg-blue/10 text-blue',
  Implement: 'border border-slate-200 bg-slate-100 text-slate-600',
  Test: 'border border-amber-200 bg-amber-50 text-amber-700',
  Integrate: 'border border-violet-200 bg-violet-50 text-violet-700',
}

const tools: Tool[] = [
  {
    name: 'LangGraph',
    tagline: 'Stateful graph-based agent orchestration',
    description:
      'Python and TypeScript framework for building multi-actor agent workflows as directed graphs. Each node is an agent or function; edges are conditional transitions. Supports branching logic, automatic retries, checkpointed state across long-running tasks, and human-in-the-loop interrupts — the agent pauses, surfaces its state, waits for approval, then resumes.',
    stages: ['Design', 'Implement', 'Integrate'],
    useItWhen:
      'Your agent needs conditional routing between specialist sub-agents, or a human-approval step before a consequential action executes.',
    link: 'https://github.com/langchain-ai/langgraph',
    linkLabel: 'View on GitHub',
  },
  {
    name: 'CrewAI',
    tagline: 'Role-based multi-agent crews',
    description:
      'Framework for assembling agents into structured teams where each agent has an assigned role, goal, and operating context. Agents execute tasks in sequence or in parallel, hand off outputs to one another, and produce a final result. Handles the coordination layer — you define the roles and the pipeline, CrewAI manages execution order and inter-agent communication.',
    stages: ['Design', 'Implement'],
    useItWhen:
      'Your workflow maps cleanly to specialist roles (researcher, reviewer, writer) that need to pass structured outputs between each other.',
    link: 'https://github.com/crewAIInc/crewAI',
    linkLabel: 'View on GitHub',
  },
  {
    name: 'DeepEval',
    tagline: 'Automated LLM evaluation in CI/CD',
    description:
      'pytest-native evaluation framework with 50+ metrics covering task completion, tool call correctness, goal accuracy, hallucination, and more. Tests run in CI/CD pipelines alongside unit tests — a failing eval blocks the merge. Metrics are designed for agentic behavior, not just text quality: whether the agent called the right tools in the right order, whether it reached the stated goal.',
    stages: ['Test', 'Implement'],
    useItWhen:
      'You need an automated quality gate that checks agent behavior — not just output text — before a code change merges.',
    link: 'https://github.com/confident-ai/deepeval',
    linkLabel: 'View on GitHub',
  },
  {
    name: 'Langfuse',
    tagline: 'Open-source LLM tracing and observability',
    description:
      'Self-hostable tracing platform that captures every LLM call, tool invocation, and agent step as structured traces with parent-child relationships. Provides session replay, cost and latency dashboards, prompt version management, and eval dataset tooling — all via OpenTelemetry. Acquired by ClickHouse in January 2026. Self-hosting satisfies data residency requirements for regulated environments where calls cannot leave your infrastructure.',
    stages: ['Implement', 'Integrate'],
    useItWhen:
      'You need end-to-end visibility into multi-agent call sequences, or your compliance posture requires that trace data stays on-premises.',
    link: 'https://github.com/langfuse/langfuse',
    linkLabel: 'View on GitHub',
  },
  {
    name: 'Mem0',
    tagline: 'Persistent cross-session agent memory',
    description:
      'Managed memory layer that combines a vector index, knowledge graph, and key-value store behind a single API. Agents write and query memories across sessions without you building memory infrastructure. HIPAA-compliant. Relevant for healthcare and financial services agents that need to recall patient context, account history, or prior case details without re-querying source systems every session.',
    stages: ['Implement', 'Integrate'],
    useItWhen:
      'Your agent needs to carry context across sessions — prior interactions, user preferences, account state — and you do not want to build and maintain the memory layer yourself.',
    link: 'https://mem0.ai',
    linkLabel: 'Visit site',
  },
  {
    name: 'LiteLLM',
    tagline: 'Unified proxy for 100+ LLM providers',
    description:
      'OpenAI-compatible SDK and proxy layer that routes agent calls to any supported provider — GPT-5, Claude 4, Gemini, private endpoints, Ollama — through a single interface. Handles load balancing, provider fallbacks, per-team budget limits, cost tracking, and audit logging. SSO and RBAC are built in.',
    stages: ['Implement', 'Integrate'],
    useItWhen:
      'You need to route across multiple LLM providers, enforce per-team spending limits, or produce audit logs of every model call.',
    link: 'https://docs.litellm.ai',
    linkLabel: 'View docs',
  },
  {
    name: 'E2B',
    tagline: 'Isolated cloud sandboxes for code execution',
    description:
      'Cloud platform that provisions isolated Linux microVM sandboxes on demand. An agent writes code, E2B executes it in a fresh sandbox, and returns stdout, stderr, and file outputs back into the agent loop. Each task gets a clean environment — no state leaks between runs. Relevant for regulated environments where agents must not execute code on shared infrastructure or touch production systems during a task.',
    stages: ['Implement', 'Integrate', 'Test'],
    useItWhen:
      'Your agent generates and executes code as part of its task loop and you need execution isolated from your infrastructure.',
    link: 'https://e2b.dev',
    linkLabel: 'Visit site',
  },
  {
    name: 'NVIDIA NeMo Guardrails',
    tagline: 'Programmable agent safety rails',
    description:
      'Open-source toolkit (Apache 2.0) for defining hard constraints on agent behavior via Colang scripting. Enforces topical restrictions, output content policies, prompt injection detection, and action-level human-confirmation requirements. GPU-accelerated enforcement under 50ms. For financial services and healthcare deployments, guardrails can block competitor mentions, require human confirmation before trades or clinical actions exceed defined thresholds, and flag injection attempts before they reach the model.',
    stages: ['Implement', 'Integrate'],
    useItWhen:
      'Your agent operates in a regulated context where certain outputs, topics, or actions must be blocked or gated on human approval — at runtime, not just in prompts.',
    link: 'https://github.com/NVIDIA/NeMo-Guardrails',
    linkLabel: 'View on GitHub',
  },
  {
    name: 'OpenAI Agents SDK',
    tagline: 'Production agent framework with handoffs',
    description:
      "OpenAI's official agent framework (successor to Swarm), released March 2026. Provides agent handoffs with structured context transfer, tool use, built-in guardrails, session persistence, and Model Context Protocol (MCP) support. Includes an adapter layer for non-OpenAI models.",
    stages: ['Design', 'Implement', 'Integrate'],
    useItWhen:
      'You need production-grade agent handoffs — a triage agent routing to specialists with preserved session context — and want to build on OpenAI\'s supported tooling.',
    link: 'https://openai.github.io/openai-agents-python/',
    linkLabel: 'View docs',
  },
  {
    name: 'Braintrust',
    tagline: 'AI eval, monitoring, and release gating',
    description:
      'Full-lifecycle evaluation and observability platform covering CI/CD eval gating, production monitoring, human annotation workflows, regression tracking, and deploy enforcement. Surfaces traces alongside eval failures so engineers can see exactly what changed and why a score dropped.',
    stages: ['Test', 'Implement'],
    useItWhen:
      'You need regression gating across releases — a defined accuracy threshold that must hold before a new agent version deploys to production.',
    link: 'https://www.braintrust.dev',
    linkLabel: 'Visit site',
  },
]

export default function AgenticToolsGrid() {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-content">
        {/* Section header */}
        <div className="mb-14">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
            10 Tools
          </p>
          <h2 className="text-[26px] font-bold tracking-tight text-navy md:text-[28px]">
            The Agentic AI Stack
          </h2>
          <p className="mt-3 max-w-[580px] text-[15px] leading-relaxed text-muted">
            Covering orchestration, evaluation, observability, memory, routing, sandboxing, safety,
            and release gating — the full production stack.
          </p>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <article
              key={tool.name}
              className="group flex flex-col rounded-lg bg-[#F8FAFC] p-7 ring-1 ring-slate-200 transition-all duration-200 hover:bg-white hover:shadow-md hover:ring-blue/20"
            >
              {/* Stage chips */}
              <div className="mb-5 flex flex-wrap gap-2">
                {tool.stages.map((stage) => (
                  <span
                    key={stage}
                    className={`rounded px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${STAGE_CLASS[stage] ?? 'border border-slate-200 bg-slate-100 text-slate-600'}`}
                  >
                    {stage}
                  </span>
                ))}
              </div>

              {/* Name + tagline */}
              <h3 className="text-[18px] font-bold leading-snug text-navy">{tool.name}</h3>
              <p className="mt-1 text-[13px] italic leading-snug text-muted">{tool.tagline}</p>

              {/* Description */}
              <p className="mt-4 text-[14px] leading-[1.75] text-text">{tool.description}</p>

              {/* Use it when callout */}
              <div className="mt-5 rounded bg-blue/5 px-4 py-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-blue">
                  Use it when
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-navy/70">{tool.useItWhen}</p>
              </div>

              {/* Link */}
              <div className="mt-auto pt-6">
                <Link
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded text-[14px] font-semibold text-blue transition-colors hover:text-navy focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {tool.linkLabel}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
