//  portfolio config - edit this file to customise the site.
//  page.tsx renders everything from these values.

export type Role = {
  title: string;
  period: string;
  bullets: string[];
};

export type Company = {
  name: string;
  url?: string;
  location: string;
  roles: Role[];
};

export type Project = {
  name: string;
  url?: string;
  urlLabel?: string;
  year: string;
  status?: string;
  techStack?: string[];
  bullets: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  url?: string;
};

export type SkillCategory = {
  title: string;
  items: string[];
};

export type School = {
  name: string;
  url?: string;
  location: string;
  degree: string;
  period: string;
  coursework?: string;
};

export type MapLocation = {
  name: string;
  coords: [number, number];
  type: "lived" | "visited";
  note?: string;
};

//  personal
export const personal = {
  name: "Affan Thameem",
  title: "AI Software Engineer",
  email: "affanthameem@gmail.com",
  location: {
    label: "Montréal, QC",
    url: "https://www.mtl.org/en",
  },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/affanthameem",
  },
  github: {
    label: "Github",
    url: "https://github.com/thameem-a",
  },
  resume: "/resume.pdf",
};

//  experience
export const experience: Company[] = [
  {
    name: "Ampliwork",
    url: "https://www.ampliwork.com",
    location: "Montréal, QC",
    roles: [
      {
        title: "Forward Deployed Engineer",
        period: "May 2026 – Present",
        bullets: [
          "Sole-engineered a full-stack ad generation platform for a financial services client — frontend through API — cutting manual ad production to zero by building a 27-endpoint FastAPI backend that renders SEC/FINRA compliant video and banner ads across every ticker, concept, and size permutation via 5 integrated AI and media APIs.",
          "Reduced client compliance review from manual pre-flight checks to zero by deploying a two-pass screening engine combining deterministic SEC/FINRA rule checks and LLM semantic review on every AI-generated ad script, with an append-only audit trail per render satisfying regulatory evidence requirements.",
          "Delivered a working client demo with a 12-minute end-to-end batch render SLA by architecting fully concurrent async job orchestration across 5 external APIs, enabling an entire ad campaign of variants to be previewed from a single API request.",
          "Restored production document processing for an enterprise investment management client by diagnosing and patching 3 live defects: LLM-hallucinated joint signatures firing false compliance warnings, cross-field validation silently dropped on every document edit, and a SQL migration matching 0 rows against MS Graph mixed-case email addresses.",
        ],
      },
      {
        title: "Full-Stack Engineer",
        period: "May 2025 – May 2026",
        bullets: [
          "Built two FastAPI microservices integrating MS Graph email ingestion and OpenAI Vision classification for a $1T+ AUM global asset manager, enabling automated processing of $250M+ in investment transactions across 2,000+ documents.",
          "Cut per-document processing time by 93% (30 minutes to under 2 minutes), achieving 99.37% extraction accuracy and 98.98% classification accuracy across all processed investment documents.",
          "Led frontend for two enterprise AI agent interfaces, shipping an email triage system with AI classification workflows and a 9-metric KPI dashboard tracking extraction accuracy and routing precision across 2,000+ investment submissions.",
        ],
      },
      {
        title: "Frontend Developer",
        period: "Nov. 2024 – May 2025",
        bullets: [
          "Reduced UI development time by building a 10+ component React/TypeScript library that eliminated redundant code across 20+ agent workspaces on a multi-tenant enterprise AI platform.",
          "Built 20+ AI agent workspace UIs with zero-reload switching by implementing Next.js parallel routes, enabling instant navigation across an enterprise platform serving investment managers.",
          "Delivered real-time KPI dashboards in Recharts giving investment managers instant visibility into extraction accuracy, classification trends, and document processing metrics across 2,000+ submissions.",
        ],
      },
    ],
  },
  {
    name: "Self-Employed",
    location: "Montréal, QC",
    roles: [
      {
        title: "Freelance Software Developer",
        period: "Sep. 2024 – Present",
        bullets: [
          "Delivered 5+ production web applications with responsive, accessible, and SEO-optimized interfaces, directly supporting client acquisition and user engagement.",
          "Achieved zero-downtime deployments across all client projects by implementing CI/CD pipelines on Vercel with automated testing.",
          "Eliminated manual booking and communication overhead by automating client workflows through GoDaddy and Gmail API integrations.",
        ],
      },
    ],
  },
];

//  projects
export const projects: Project[] = [
  {
    name: "Predicting Reddit Post Popularity",
    url: "https://github.com/thameem-a/Predicting-Reddit-Post-Popularity",
    urlLabel: "GitHub",
    year: "2026",
    techStack: [
      "Python",
      "PyTorch",
      "HuggingFace Transformers",
      "scikit-learn",
      "DistilBERT",
    ],
    bullets: [
      "Fine-tuned a hybrid DistilBERT + metadata regression model on 450,000 Reddit posts to predict upvote counts at publish time, before any user engagement, achieving a test RMSE of 1.35 on log(1+score).",
      "Engineered a stratified sampling pipeline over a compressed 2026 Pushshift corpus, producing balanced train/val/test splits across four score bins to prevent low-score posts from dominating training.",
      "Benchmarked five models (Dummy, Ridge, Random Forest, BERT title-only, BERT content-aware); content-aware BERT beat Random Forest by 7.5% RMSE, confirming body text adds signal beyond metadata alone.",
    ],
  },
  {
    name: "Campus Guessr",
    url: "con-u-guessr.vercel.app",
    urlLabel: "GitHub",
    year: "2026",
    techStack: ["Next.js", "FastAPI", "Supabase", "AWS S3", "Vercel"],
    bullets: [
      "Built a GeoGuessr-style web game for Concordia and Mcgill University's campus. Players guess locations from campus photos and score points based on how close their pin lands on an interactive map.",
      "Engineered real-time multiplayer using WebSockets alongside a session-based single-player mode, with a distance-accuracy scoring system (≤10m = 5000 pts) and a persistent leaderboard.",
      "Full-stack: Next.js 14 + HeroUI frontend with Framer Motion animations, backed by a FastAPI + Supabase service with async Motor driver for non-blocking I/O across location and session routes.",
    ],
  },
  {
    name: "Bedrock",
    url: "https://github.com/thameem-a/bedrock",
    urlLabel: "GitHub",
    year: "2026",
    status: "In Progress",
    techStack: ["Next.js", "FastAPI", "Supabase"],
    bullets: [
      "Full-stack boilerplate bootstrapped via CLI — Next.js 15 + FastAPI monorepo with JWT, MFA, OTP, SSO, and password reset schemas built in from day one.",
      "Modular template system — extend at init time with SaaS (multi-tenant + payments) or a marketing landing page via CLI flags.",
      "Ships with a pre-built HeroUI component library, Alembic-managed migrations, Pydantic settings, and dark/light theming out of the box.",
    ],
  },
];

//  skills
export const certifications: Certification[] = [
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: [
      "Python",
      "Java",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "FastAPI",
      "REST APIs",
      "SQLAlchemy",
      "Alembic",
      "Axios",
      "JWT",
      "Tailwind CSS",
      "Streamlit",
    ],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL"],
  },
  {
    title: "Cloud & Infrastructure",
    items: ["AWS", "Azure (Microsoft Graph)", "Supabase", "Vercel"],
  },
  {
    title: "Developer Tools",
    items: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Docker",
      "Zed",
      "VS Code",
      "Postman",
      "Figma",
    ],
  },
];

//  education
export const education: School[] = [
  {
    name: "Concordia University",
    url: "https://www.concordia.ca",
    location: "Montréal, QC",
    degree: "Bachelor of Computer Science",
    period: "Expected Dec. 2026",
    coursework:
      "Data Structures & Algorithms, Machine Learning, Data Analytics, Operating Systems",
  },
  {
    name: "Champlain College",
    location: "Saint-Lambert, QC",
    degree: "DEC in Commerce",
    period: "Sept. 2020 – May 2023",
    coursework:
      "Micro & Macroeconomics, Financial Accounting, Business Law, Quantitative Methods",
  },
];

//  map locations — add/remove freely. type: "lived" = filled dot, "visited" = hollow dot
export const mapLocations: MapLocation[] = [
  {
    name: "Montréal, QC",
    coords: [45.5017, -73.5673],
    type: "lived",
    note: "Home",
  },
  {
    name: "Saint-Lambert, QC",
    coords: [45.5164017, -73.520575],
    type: "lived",
    note: "Champlain College",
  },
  {
    name: "Montreal, QC",
    coords: [45.49726, -73.57891],
    type: "lived",
    note: "Concordia University",
  },
  {
    name: "Istanbul, Turkey",
    coords: [41.0082, 28.9784],
    type: "visited",
    note: "Visited",
  },
  {
    name: "Athens, Greece",
    coords: [37.9838, 23.7275],
    type: "visited",
    note: "Visited",
  },
  {
    name: "Dubai, UAE",
    coords: [25.2048, 55.2708],
    type: "visited",
    note: "Visited",
  },
  {
    name: "Amman, Jordan",
    coords: [31.9522, 35.9132],
    type: "visited",
    note: "Visited",
  },
  {
    name: "Petra, Jordan",
    coords: [30.3286, 35.4437],
    type: "visited",
    note: "Visited",
  },
  {
    name: "Wadi Rum, Jordan",
    coords: [32.2956, 35.8926],
    type: "visited",
    note: "Visited",
  },
  {
    name: "Cancun, Mexico",
    coords: [21.1702, -86.8522],
    type: "visited",
    note: "Visited",
  },
  {
    name: "San Antonio, TX",
    coords: [29.4241, -98.4936],
    type: "lived",
    note: "Lived",
  },
  {
    name: "Moncton, NB",
    coords: [46.2372, -74.3769],
    type: "lived",
    note: "Lived",
  },
  {
    name: "Chennai, India",
    coords: [13.0827, 80.2707],
    type: "lived",
    note: "Lived",
  },
  {
    name: "Kula Lampur, Malaysia",
    coords: [3.139, 101.6869],
    type: "lived",
    note: "Lived",
  },
  {
    name: "New York, NY",
    coords: [40.7128, -74.006],
    type: "visited",
    note: "Visited",
  },
  {
    name: "Paris, France",
    coords: [48.8566, 2.3522],
    type: "visited",
    note: "Visited",
  },
  {
    name: "Veradero, Cuba",
    coords: [10.4806, -73.2183],
    type: "visited",
    note: "Visited",
  },
  {
    name: "London",
    coords: [51.5074, -0.1278],
    type: "visited",
    note: "Visited",
  },
  {
    name: "Boston, MA",
    coords: [42.3601, -71.0589],
    type: "visited",
    note: "Visited",
  },
];
