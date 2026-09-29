export interface NavItem {
  label: string;
  href: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface ComparisonItem {
  aspect: string;
  traditional: string;
  kairo: string;
}

export interface CoreFeature {
  id: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  badge: string;
}

export interface CatalogNode {
  type: string;
  name: string;
  description: string;
  cost: number;
  costUnit: string;
  icon: string;
  tag: string;
}

export interface CatalogCategory {
  categoryKey: string;
  categoryTitle: string;
  nodes: CatalogNode[];
}

export interface PricingPlanItem {
  id: string;
  name: string;
  tagline: string;
  price: number | null;
  priceDisplay: string;
  period: string;
  credits: number | null;
  creditsDisplay: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaHref: string;
  minCredits?: number;
  maxCredits?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const KAIRO_SPEC = {
  project: {
    name: "Kairo",
    version: "2.0.0",
    tagline: "Visual Workflow Automation & Intelligent Job Orchestration",
    elevatorPitch:
      "Kairo is a visual workflow automation platform and high-performance job scheduler. Build, test, and deploy automated pipelines using an intuitive drag-and-drop canvas or natural language prompts powered by Kai, your autonomous AI automation co-pilot.",
    targetAudience: [
      "Software Engineers & Developers",
      "DevOps & Platform Teams",
      "Full-Stack Builders & Indie Hackers",
      "Technical Product Managers & Operations",
    ],
  },
  brandIdentity: {
    brandName: "Kairo",
    aiBrandName: "Kai",
    voiceAndTone:
      "Modern, sleek, developer-first, precise, high-performance, empowering",
    designStyle:
      "Dark-mode optimized, glassmorphic accents, clean grid lines, minimalist cyber-technical aesthetic",
    colorTokens: {
      primary: "#2563eb",
      secondary: "#0f172a",
      backgroundDark: "#0b0f19",
      backgroundLight: "#f8fafc",
      accentSuccess: "#10b981",
      accentAiGradient: {
        from: "#22d3ee",
        via: "#818cf8",
        to: "#e879f9",
      },
      cardBorder: "rgba(255, 255, 255, 0.1)",
    },
    kaiLogoSvgPath:
      "M 44.5 11.2 Q 50 8 55.5 11.2 L 82.5 26.8 Q 88 30 88 36 L 88 64 Q 88 70 82.5 73.2 L 55.5 88.8 Q 50 92 44.5 88.8 L 17.5 73.2 Q 12 70 12 64 L 12 36 Q 12 30 17.5 26.8 Z M 51.8 32.3 Q 56 30 60.2 32.4 L 82.5 45.0 Q 86 47 81.5 49.5 L 48.2 67.7 Q 44 70 39.8 67.6 L 17.5 55.0 Q 14 53 18.5 50.5 Z",
  },
  navigation: {
    logo: {
      text: "Kairo",
      badge: "v2.0",
    },
    navItems: [
      { label: "Canvas Editor", href: "#editor" },
      { label: "Kai AI Agent", href: "#kai-ai" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
      { label: "Docs", href: "#docs" },
    ],
  },
  heroSection: {
    announcementBadge: {
      text: "Kai AI 2.0 Autonomous Orchestrator is Live",
      linkText: "Explore AI Mode →",
      linkHref: "#kai-ai",
    },
    headline: "Automate Complex Workflows with Visual Precision & AI",
    headlineHighlight: "Visual Precision & AI",
    subheadline:
      "Build, schedule, and orchestrate mission-critical background jobs with a drag-and-drop node canvas or plain English prompts. Low latency execution, real-time logs, and transparent credit pricing.",
    ctaGroup: {
      primary: {
        text: "Start Building Free",
        note: "100 Free Credits Included • No Credit Card Required",
      },
      secondary: {
        text: "Live Interactive Demo",
        href: "#editor",
      },
    },
    keyMetricsBar: [
      { value: "99.4%", label: "Execution Success Rate" },
      { value: "<240ms", label: "Average Worker Latency" },
      { value: "AES-256", label: "Credential Vault Encryption" },
      { value: "100%", label: "Visual DAG Traversal" },
    ],
    heroVisualMockup: {
      title: "Stripe Webhook → AI Reasoning → Postgres Sync → Slack Alert",
      activeExecutionState: "Worker Active",
      nodesInPreview: [
        {
          id: "node-1",
          type: "WEBHOOK",
          label: "Stripe Webhook",
          status: "200 OK",
          cost: "1 credit",
          time: "12ms",
        },
        {
          id: "node-2",
          type: "OPENAI",
          label: "GPT-4 Reasoning",
          status: "Analyzed",
          cost: "3 credits",
          time: "184ms",
        },
        {
          id: "node-3",
          type: "POSTGRES",
          label: "PostgreSQL Insert",
          status: "Committed",
          cost: "2 credits",
          time: "28ms",
        },
        {
          id: "node-4",
          type: "SLACK",
          label: "Slack Alert",
          status: "Delivered",
          cost: "1 credit",
          time: "16ms",
        },
      ],
    },
  },
  comparisonSection: {
    title: "Why Modern Engineering Teams Choose Kairo",
    subtitle:
      "Stop maintaining brittle cron scripts and battling clunky enterprise automation tools.",
    comparison: [
      {
        aspect: "Workflow Creation",
        traditional:
          "Manual configuration of dozens of form fields or writing 500-line Python scripts.",
        kairo:
          "Visual React Flow canvas with drag-and-drop nodes or 1-sentence prompt with Kai AI.",
      },
      {
        aspect: "Observability",
        traditional:
          "Scattered CloudWatch logs, opaque failure silent drops, hard-to-reproduce errors.",
        kairo:
          "Live streaming execution worker, step-by-step DAG highlighting, and JSON payload inspection.",
      },
      {
        aspect: "Pricing & Costs",
        traditional:
          "Hefty $299/mo enterprise minimums with punitive per-step billing.",
        kairo:
          "Pay-as-you-go micro-credits starting at ₹99 with transparent cost-per-node.",
      },
      {
        aspect: "Security & Secrets",
        traditional:
          "Plaintext environment variables scattered across servers and repositories.",
        kairo:
          "Dedicated AES-256 encrypted credential vault with key masking and tenant isolation.",
      },
    ],
  },
  coreFeatures: [
    {
      id: "visual-canvas",
      category: "Canvas Editor",
      title: "Interactive Drag-and-Drop Workflow Canvas",
      description:
        "Construct sophisticated multi-step pipelines on an infinite zoomable canvas powered by React Flow. Connect triggers to action handles with automatic validation before execution.",
      bullets: [
        "Interactive node and edge graph management with multi-handle connections",
        "Pre-execution graph validation preventing cyclic deadlocks and orphaned nodes",
        "Auto-save state with instant cloud synchronization",
        "Seamless toggle between Editor Design mode and live Execution Worker",
      ],
      badge: "React Flow Powered",
    },
    {
      id: "kai-ai-copilot",
      category: "Autonomous AI",
      title: "Kai: Automation Agent",
      description:
        "Don't build from scratch—describe your intended pipeline in plain English. Kai reasons through the logic, selects the optimal nodes, wires the parameters, and validates the workflow.",
      bullets: [
        "Prompt-to-workflow synthesis: converts natural language into full DAGs",
        "Interactive in-editor chat assistant for instant troubleshooting and tuning",
        "Context-aware recommendations for latency reduction and credential setup",
        "Real-time token and credit consumption estimation",
      ],
      badge: "Next-Gen AI Agent",
    },
    {
      id: "execution-engine",
      category: "Execution Engine",
      title: "Worker & Live Observability",
      description:
        "Run automations backed by an asynchronous queue and execution tree traverser. Monitor executions in real-time with sub-second latency and granular payload inspection.",
      bullets: [
        "Directed Acyclic Graph (DAG) traversal with deterministic node resolution",
        "Live worker console streaming terminal logs and sub-250ms latency metrics",
        "Instant JSON payload viewer with one-click copy and schema validation",
        "On-demand retry mechanisms and execution status tracking (Draft, Ongoing, Completed, Failed)",
      ],
      badge: "Sub-250ms Latency",
    },
    {
      id: "credential-vault",
      category: "Security & Vault",
      title: "Zero-Leak Credential Vault",
      description:
        "Centralize and protect third-party API keys, database connection strings, and webhook tokens with enterprise-grade encryption.",
      bullets: [
        "AES-256 encryption at rest with tenant-level cryptographic isolation",
        "Front-end secret masking (e.g. sk-proj-••••••••••••••••) preventing shoulder surfing",
        "Direct runtime secret injection without exposing keys in frontend bundles",
        "Instant key revocation and provider verification",
      ],
      badge: "AES-256 Encrypted",
    },
    {
      id: "credit-billing",
      category: "Billing & Economics",
      title: "Transparent On-the-go Billing",
      description:
        "No locked-in monthly retainers. Pay only for the nodes and computational horsepower you actually execute, tracked in real-time on an immutable ledger.",
      bullets: [
        "100 free welcome credits awarded to every newly registered user",
        "Clear per-node pricing (0 credits for triggers, 1-3 credits for actions and AI)",
        "Immutable credit ledger recording every purchase, execution deduction, and refund",
        "Frictionless Razorpay payment gateway integration with instant balance crediting",
      ],
      badge: "Pay Only For Usage",
    },
  ],
  nodeCatalog: {
    sectionTitle: "Modular Nodes & Deep Integrations",
    sectionSubtitle:
      "Everything you need to connect your stack—from webhooks and AI models to SQL databases and notifications.",
    categories: [
      {
        categoryKey: "triggers",
        categoryTitle: "Triggers (Inputs)",
        nodes: [
          {
            type: "TEXT",
            name: "Text Input Trigger",
            description:
              "Inject dynamic or static text payloads directly into downstream nodes.",
            cost: 0,
            costUnit: "credits",
            icon: "FileText",
            tag: "Free",
          },
          {
            type: "HTTP_TRIGGER",
            name: "Browser URL Trigger",
            description:
              "Trigger workflows from browser URL navigations and web queries.",
            cost: 0,
            costUnit: "credits",
            icon: "Globe",
            tag: "Free",
          },
          {
            type: "HTTP_REQUEST",
            name: "HTTP Request Trigger",
            description:
              "Dispatch outgoing HTTP calls or receive incoming web calls to start executions.",
            cost: 0,
            costUnit: "credits",
            icon: "Network",
            tag: "Free",
          },
          {
            type: "WEBHOOK",
            name: "Webhook Trigger",
            description:
              "Receive and parse real-time incoming JSON payloads from Stripe, GitHub, Shopify, or custom apps.",
            cost: 1,
            costUnit: "credit",
            icon: "Webhook",
            tag: "Real-time",
          },
          {
            type: "MANUAL_TRIGGER",
            name: "Manual Run Trigger",
            description:
              "Run and test workflows on-demand with custom test parameters from the dashboard.",
            cost: 0,
            costUnit: "credits",
            icon: "PlayCircle",
            tag: "Testing",
          },
        ],
      },
      {
        categoryKey: "ai",
        categoryTitle: "Artificial Intelligence",
        nodes: [
          {
            type: "OPENAI",
            name: "OpenAI GPT-4",
            description:
              "Execute text generation, complex structured data extraction, classification, and cognitive reasoning.",
            cost: 3,
            costUnit: "credits",
            icon: "Sparkles",
            tag: "Advanced AI",
          },
          {
            type: "GEMINI",
            name: "Google Gemini",
            description:
              "High-speed multi-modal reasoning, prompt evaluation, and context-window processing.",
            cost: 2,
            costUnit: "credits",
            icon: "Brain",
            tag: "Multimodal",
          },
        ],
      },
      {
        categoryKey: "actions",
        categoryTitle: "Actions & Storage",
        nodes: [
          {
            type: "POSTGRES",
            name: "PostgreSQL Database",
            description:
              "Execute parameterized SQL queries, upserts, transactions, and mutations directly into your database.",
            cost: 2,
            costUnit: "credits",
            icon: "Database",
            tag: "Database",
          },
          {
            type: "EMAIL",
            name: "Transactional Email",
            description:
              "Dispatch automated transactional emails and customer notifications via SMTP.",
            cost: 1,
            costUnit: "credit",
            icon: "Mail",
            tag: "Messaging",
          },
          {
            type: "SLACK",
            name: "Slack Notification",
            description:
              "Send rich block-formatted messages and incident alerts directly to private or public channels.",
            cost: 1,
            costUnit: "credit",
            icon: "MessageSquare",
            tag: "Alerts",
          },
          {
            type: "GOOGLE_FORM",
            name: "Google Form Integration",
            description:
              "Extract real-time form survey responses or submit automated responses programmatically.",
            cost: 1,
            costUnit: "credit",
            icon: "CheckSquare",
            tag: "Forms",
          },
          {
            type: "OUTPUT",
            name: "Output Node",
            description:
              "Capture, format, and display final execution payloads cleanly on the canvas.",
            cost: 0,
            costUnit: "credits",
            icon: "Terminal",
            tag: "Visualizer",
          },
        ],
      },
    ],
    upcomingIntegrations: [
      "Stripe Billing",
      "GitHub Events",
      "Supabase",
      "Discord Webhooks",
      "Airtable",
      "Redis Queue",
    ],
  },
  kaiAssistantSpotlight: {
    badge: "Always-On Copilot",
    title: "Meet Kai: Your Workflow Architect",
    description:
      "Say goodbye to manual configuration fatigue. Open Kai from any screen, type your intent in natural language, and let the agent assemble the workflow nodes for you.",
    samplePrompts: [
      {
        prompt:
          "Every Monday at 9 AM, fetch latest GitHub issues and send a summary to Slack.",
        outcome:
          "Generates a Cron Trigger → GitHub Fetch → OpenAI Summary → Slack Alert pipeline.",
        nodes: [
          "Cron Trigger",
          "GitHub Issues",
          "GPT-4 Reasoning",
          "Slack Alert",
        ],
        cost: "4 credits / run",
      },
      {
        prompt:
          "Build a Stripe webhook workflow to save charges in Postgres and alert #sales.",
        outcome:
          "Wires Webhook Trigger → Validation Node → Postgres Insert → Slack Notification.",
        nodes: [
          "Stripe Webhook",
          "Payload Validator",
          "PostgreSQL",
          "Slack #sales",
        ],
        cost: "4 credits / run",
      },
      {
        prompt:
          "Extract Google Form entries, evaluate sentiment with Gemini, and email high-priority leads.",
        outcome:
          "Creates Form Trigger → Gemini Reasoning → Conditional Filter → Email Dispatch.",
        nodes: [
          "Google Form",
          "Gemini 2.5",
          "Priority Filter",
          "Transactional Email",
        ],
        cost: "3 credits / run",
      },
    ],
    assistantCapabilities: [
      {
        title: "Interactive Chat & Troubleshooting",
        description:
          "Ask Kai about optimizing pipeline latency, or debug execution errors in conversational real-time.",
      },
      {
        title: "Credit & Cost Transparency",
        description:
          "Kai calculates exact node credit consumption before you trigger runs, guaranteeing zero unexpected deductions.",
      },
      {
        title: "Pre-built Starter Suggestions",
        description:
          "One-click starter templates accessible right inside the chat drawer for webhooks, cron jobs, and database syncs.",
      },
    ],
  },
  workerAndObservabilitySection: {
    title: "Battle-Tested Execution Engine & Worker",
    subtitle: "Everything happening under the hood is visible in real-time.",
    features: [
      {
        title: "Real-Time Terminal Streaming",
        description:
          "Watch node execution logs stream live with microsecond timestamps and status badges.",
        badge: "Live Stream",
      },
      {
        title: "Sub-250ms Execution Latency",
        description:
          "Optimized execution loop with minimal graph overhead handles high-volume event streams effortlessly.",
        badge: "High Performance",
      },
      {
        title: "JSON Payload Inspector",
        description:
          "Inspect inputs and outputs for every step. Copy clean formatted JSON payloads with a single click.",
        badge: "Payload Inspection",
      },
      {
        title: "On-Demand Retry & Failover",
        description:
          "Inspect failed nodes, view exact error stack traces, and re-execute failed steps with one click.",
        badge: "Zero Data Loss",
      },
    ],
  },
  howItWorks: [
    {
      step: "01",
      title: "Prompt or Drag",
      description:
        "Start with a natural language instruction to Kai, or pick nodes from the sidebar and place them onto the canvas.",
    },
    {
      step: "02",
      title: "Connect & Configure",
      description:
        "Drag edge connectors between input and output ports. Attach your encrypted credentials with zero hassle.",
    },
    {
      step: "03",
      title: "Validate & Execute",
      description:
        "Hit Execute to test on-demand or configure automated triggers. Kairo validates graph integrity before running.",
    },
    {
      step: "04",
      title: "Monitor & Scale",
      description:
        "Track execution metrics in the Worker tab, inspect JSON payloads, and monitor credit consumption on your ledger.",
    },
  ],
  pricingSection: {
    title: "Simple, Transparent, Credit-Based Pricing",
    subtitle:
      "No lock-in contracts or punitive monthly minimums. Purchase credits and use them when you execute.",
    currency: "INR (₹)",
    freeTierBanner: {
      title: "Get Started with 100 Free Credits",
      description:
        "Every new account receives 100 free credits immediately upon registration. Build and test real workflows without spending a rupee.",
    },
    plans: [
      {
        id: "FREE_TIER",
        name: "Free Tier",
        tagline: "For testing and personal sandbox workflows",
        price: 0,
        priceDisplay: "₹0",
        period: "forever",
        credits: 50,
        creditsDisplay: "50 Credits / mo",
        popular: false,
        features: [
          "50 Monthly Workflow Credits",
          "Access to Core Trigger Nodes",
          "Visual React Flow Canvas",
          "Basic Execution Worker Logs",
          "AES-256 Encrypted Credential Vault",
          "Community Support",
        ],
        ctaText: "Start Free",
        ctaHref: "/register",
      },
      {
        id: "SMALL",
        name: "Small Tier",
        tagline: "For side projects and lightweight automations",
        price: 99,
        priceDisplay: "₹99",
        period: "one-time top-up",
        credits: 100,
        creditsDisplay: "100 Credits",
        popular: false,
        features: [
          "100 Execution Credits",
          "All Triggers & Action Nodes",
          "OpenAI & Gemini AI Node Access",
          "Standard Worker Execution Priority",
          "Unlimited Stored Credentials",
          "Standard Support",
        ],
        ctaText: "Get Small Pack",
        ctaHref: "/billing",
      },
      {
        id: "MEDIUM",
        name: "Medium Tier",
        tagline: "Most popular for growing creators & startups",
        price: 299,
        priceDisplay: "₹299",
        period: "one-time top-up",
        credits: 500,
        creditsDisplay: "500 Credits",
        popular: true,
        features: [
          "500 Execution Credits (~₹0.60/credit)",
          "All Triggers, AI Nodes & DB Connectors",
          "High Priority Worker Processing",
          "Advanced Kai AI Assistant Reasoning",
          "Detailed Execution Logs & History",
          "Priority Email Support",
        ],
        ctaText: "Get Medium Pack",
        ctaHref: "/billing",
      },
      {
        id: "LARGE",
        name: "Large Tier",
        tagline: "For production workloads and high-frequency syncs",
        price: 499,
        priceDisplay: "₹499",
        period: "one-time top-up",
        credits: 1200,
        creditsDisplay: "1,200 Credits",
        popular: false,
        features: [
          "1,200 Execution Credits (~₹0.41/credit)",
          "Best Value for High-Volume Workflows",
          "Fast-lane Worker Execution Queue",
          "Extended Execution Payload History",
          "Unlimited Workflows & Credentials",
          "Dedicated Discord/Priority Support",
        ],
        ctaText: "Get Large Pack",
        ctaHref: "/billing",
      },
      {
        id: "CUSTOM",
        name: "Custom Tier",
        tagline: "Tailored for scaling businesses & teams",
        price: null,
        priceDisplay: "₹0.40 / credit",
        period: "slider / custom amount",
        credits: null,
        creditsDisplay: "100 to 10,000 Credits",
        minCredits: 100,
        maxCredits: 10000,
        popular: false,
        features: [
          "Dynamic Credit Slider (100 - 10,000)",
          "Volume Discount Rates",
          "Enterprise Webhook Endpoints",
          "Custom Node Configuration Assistance",
          "Dedicated Infrastructure Queueing",
          "Direct SLA & Architecture Reviews",
        ],
        ctaText: "Configure Credits",
        ctaHref: "/billing",
      },
    ],
    paymentProviders: [
      { name: "Razorpay", type: "Instant UPI, Credit/Debit Cards, NetBanking" },
    ],
  },
  securityAndArchitecture: {
    title: "Enterprise-Grade Security & Resilient Architecture",
    pillars: [
      {
        title: "Cryptographic Isolation",
        description:
          "All API tokens, passwords, and connection strings are stored using AES-256 encryption. Only decrypted at the millisecond of worker execution.",
      },
      {
        title: "Immutable Credit Ledger",
        description:
          "Double-entry bookkeeping style ledger for every single credit mutation, preventing billing drift.",
      },
      {
        title: "Modern Tech Foundation",
        description:
          "Built on Next.js 14, React Flow, TypeScript, TailwindCSS, Express.js, Prisma ORM, and PostgreSQL.",
      },
    ],
  },
  faq: [
    {
      question: "What is Kairo?",
      answer:
        "Kairo is a visual workflow automation platform and job scheduler. It lets you create, schedule, and execute complex backend workflows using an interactive drag-and-drop canvas or natural language prompts via Kai AI.",
    },
    {
      question: "What is Kai and how does it work?",
      answer:
        "Kai is the native AI automation co-pilot inside Kairo. You can describe your goal in natural language (e.g., 'When a Stripe charge occurs, save customer to PostgreSQL and alert Slack'), and Kai will automatically assemble and configure the workflow.",
    },
    {
      question: "How do credits work?",
      answer:
        "Kairo operates on a pay-as-you-go credit system. Trigger nodes and output viewers are free (0 credits). Action nodes like Slack alerts or emails cost 1 credit, database queries cost 2 credits, and advanced AI reasoning (OpenAI/Gemini) costs 2-3 credits. You receive 100 free credits on sign up.",
    },
    {
      question: "How are my API credentials and secrets protected?",
      answer:
        "All credentials are encrypted at rest with AES-256 and masked in the user interface. Secrets are only decrypted within the isolated backend worker execution context and are never exposed to client-side scripts.",
    },
    {
      question: "Can I test workflows before scheduling them?",
      answer:
        "Yes! The interactive canvas has an instant 'Execute' engine that lets you run workflows manually, inspect live logs, and examine the resulting JSON payloads step-by-step in the Worker tab.",
    },
    {
      question: "What happens if a step in my workflow fails?",
      answer:
        "Kairo isolates step failures, logs the exact error message and execution latency, and preserves the payload so you can debug and retry with one click.",
    },
  ],
  footer: {
    tagline: "Kairo — Visual Automation for Modern Builders.",
    links: {
      product: [
        { label: "Canvas Editor", href: "#editor" },
        { label: "Kai AI", href: "#kai-ai" },
        { label: "Integrations", href: "#integrations" },
        { label: "Pricing", href: "#pricing" },
        { label: "Documentation", href: "#docs" },
      ],
      resources: [
        { label: "API Reference", href: "#api" },
        { label: "Community Discord", href: "#community" },
        {
          label: "GitHub Repository",
          href: "https://github.com/exorcist09/kairo-v2",
        },
      ],
      legal: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Security", href: "#security" },
      ],
    },
    copyright: "© 2026 Kairo. All rights reserved.",
  },
};

export const AUTH_URLS = {
  signIn:
    import.meta.env.VITE_SIGNIN_URL || "https://kairoworkflow.vercel.app/login",
  signUp:
    import.meta.env.VITE_SIGNUP_URL ||
    "https://kairoworkflow.vercel.app/register",
};
