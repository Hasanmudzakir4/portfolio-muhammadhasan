export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  iconType: "code" | "mobile" | "backend" | "design";
  highlights: string[];
  deliverables: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  headerBg: string;
  dotColor: string;
  categoryColor: string;
  mockupType:
    | "taskly"
    | "shopease"
    | "fintrack"
    | "wanderly"
    | "devpulse"
    | "mediflow";
  year: string;
  role: string;
  overview: string;
  challenge: string;
  solution: string;
  metrics: string[];
  stack: string[];
  liveUrl: string;
}

export interface TimelineEntry {
  period: string;
  role: string;
  organization: string;
  detail: string;
}

export const PROFILE = {
  name: "Muhammad Hasan Mudzakir",
  pronouns: "He/Him",
  badgeRole: "Full-Stack Developer",
  editionYear: "2025",
  heroTagline:
    "I build digital products that are fast, scalable and thoughtfully designed.",
  aboutBio:
    "I'm a full-stack developer who loves turning ideas into real-world web and mobile applications. I enjoy solving problems, writing clean code and creating smooth user experiences.",
  location: "West Java, Indonesia",
  email: "hasanmudzakir0204@gmail.com",
  website: "hasanmudzakir.dev",
  linkedin: "linkedin.com/in/muhammad-hasan-mudzakir",
  github: "github.com/muhammad-hasan-mudzakir",
  twitter: "x.com/hasanmudzakir",
  instagram: "instagram.com/sanmudzakir",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "web",
    title: "Web Development",
    description:
      "Building responsive and performant websites using modern stacks.",
    iconBg: "#1E293B",
    iconType: "code",
    highlights: [
      "Server-rendered & SPA architectures with React and Next.js",
      "Core Web Vitals optimization and accessible semantic markup",
      "Component libraries built with TypeScript and Tailwind CSS",
    ],
    deliverables: ["SaaS Web Apps", "Marketing Platforms", "Design Systems"],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps with clean UI and smooth performance.",
    iconBg: "#1E293B",
    iconType: "mobile",
    highlights: [
      "60fps native-feel gestures, transitions, and offline-first storage",
      "Unified iOS & Android codebases with clean modular state",
      "Push notifications, deep linking, and biometric auth flows",
    ],
    deliverables: [
      "iOS & Android Apps",
      "Offline Sync Engines",
      "App Store Releases",
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description:
      "RESTful APIs, databases and scalable server-side applications.",
    iconBg: "#1E293B",
    iconType: "backend",
    highlights: [
      "Secure Node.js & Express APIs with role-based authentication",
      "Schema modeling, indexing, and caching with MongoDB & Firebase",
      "Webhook pipelines, payment checkouts, and background workers",
    ],
    deliverables: [
      "REST & Realtime APIs",
      "Database Architecture",
      "Cloud Deployments",
    ],
  },
  {
    id: "design",
    title: "UI/UX Design",
    description:
      "Designing intuitive and beautiful interfaces that users love.",
    iconBg: "#1E293B",
    iconType: "design",
    highlights: [
      "Interactive Figma prototypes from low-fi wireframes to hi-fi specs",
      "User journey mapping focused on clarity and conversion",
      "Consistent typography, color tokens, and micro-interactions",
    ],
    deliverables: ["Figma Prototypes", "UI Kits & Tokens", "Usability Audits"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "taskly",
    title: "Taskly",
    category: "Productivity",
    description: "Task management app to organize your work smartly.",
    headerBg: "#151D28",
    dotColor: "#3B82F6",
    categoryColor: "#60A5FA",
    mockupType: "taskly",
    year: "2025",
    role: "Full-Stack Developer & UI Designer",
    overview:
      "A cross-device workspace combining sprint boards, smart daily agendas, and instant keyboard-driven task capture for remote teams.",
    challenge:
      "Teams struggled with bloated project trackers that slowed down quick daily task updates across desktop and mobile.",
    solution:
      "Engineered an optimistic-UI sync layer with React, Next.js, Node.js, and Firebase so status updates reflect in under 50ms across web and mobile.",
    metrics: [
      "42% faster daily standup updates",
      "99.9% realtime sync uptime",
      "4.9/5 beta tester rating",
    ],
    stack: ["React", "Next.js", "Node.js", "Firebase", "Tailwind CSS", "Figma"],
    liveUrl: "https://taskly.shoaibhamza.dev",
  },
  {
    id: "shopease",
    title: "ShopEase",
    category: "E-Commerce",
    description: "Modern e-commerce platform with secure checkout.",
    headerBg: "#151D28",
    dotColor: "#F59E0B",
    categoryColor: "#FBBF24",
    mockupType: "shopease",
    year: "2024",
    role: "Full-Stack Developer",
    overview:
      "A high-converting multi-category retail storefront featuring instant facet filtering, curated lookbooks, and a frictionless 2-step checkout.",
    challenge:
      "High cart abandonment on mobile viewports caused by slow catalog filtering and multi-page checkout forms.",
    solution:
      "Built edge-cached catalog queries with MongoDB aggregation pipelines, persistent cart state, and Express webhook verification.",
    metrics: [
      "31% lower checkout drop-off",
      "Sub-300ms catalog filtering",
      "12,000+ monthly active shoppers",
    ],
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "JavaScript",
    ],
    liveUrl: "https://shopease.shoaibhamza.dev",
  },
  {
    id: "fintrack",
    title: "FinTrack",
    category: "Finance",
    description: "Personal finance tracker to manage income & expenses.",
    headerBg: "#151D28",
    dotColor: "#10B981",
    categoryColor: "#34D399",
    mockupType: "fintrack",
    year: "2024",
    role: "Lead Developer & Product Designer",
    overview:
      "Personal cash-flow companion turning raw bank transactions into clear monthly budgets, savings goals, and visual spending breakdowns.",
    challenge:
      "Most budgeting apps overwhelm everyday users with accounting jargon instead of actionable spending clarity.",
    solution:
      "Designed calm visual ring charts, recurring bill alerts, and instant CSV/category rules backed by encrypted Node.js & MongoDB storage.",
    metrics: [
      "18 hrs/year saved on manual tracking",
      "Zero-lag interactive charts",
      "86% 30-day user retention",
    ],
    stack: ["React", "JavaScript", "Node.js", "MongoDB", "CSS", "UI/UX"],
    liveUrl: "https://fintrack.shoaibhamza.dev",
  },
  {
    id: "wanderly",
    title: "Wanderly",
    category: "Travel",
    description: "Explore places, plan trips and discover amazing deals.",
    headerBg: "#151D28",
    dotColor: "#3B82F6",
    categoryColor: "#60A5FA",
    mockupType: "wanderly",
    year: "2025",
    role: "Full-Stack Engineer & UI/UX",
    overview:
      "Collaborative itinerary builder and destination discovery platform helping travelers curate routes, stays, and seasonal flight deals.",
    challenge:
      "Travelers juggled dozens of browser tabs, spreadsheets, and chat links just to coordinate a single group trip.",
    solution:
      "Combined visual destination guides, drag-and-drop day planners, and real-time budget splitting in a responsive Next.js & Firebase app.",
    metrics: [
      "3,400+ itineraries created",
      "1.1s First Contentful Paint",
      "Featured in Indie Travel Weekly",
    ],
    stack: ["Next.js", "React", "Firebase", "Tailwind CSS", "Figma", "HTML"],
    liveUrl: "https://wanderly.shoaibhamza.dev",
  },
  {
    id: "devpulse",
    title: "DevPulse",
    category: "Developer Tools",
    description: "API uptime monitor and incident status page builder.",
    headerBg: "#151D28",
    dotColor: "#10B981",
    categoryColor: "#34D399",
    mockupType: "devpulse",
    year: "2024",
    role: "Full-Stack Developer",
    overview:
      "Lightweight endpoint monitoring dashboard with multi-region latency checks, Slack/email alerts, and clean public status pages.",
    challenge:
      "Indie teams needed transparent uptime reporting without paying enterprise observability bills.",
    solution:
      "Engineered scheduled Node.js health workers, time-series aggregation in MongoDB, and embeddable status badges.",
    metrics: [
      "50k+ daily health checks",
      "Sub-10s alert dispatch",
      "Open-sourced core runner",
    ],
    stack: ["Node.js", "React", "MongoDB", "Tailwind CSS", "Git"],
    liveUrl: "https://devpulse.shoaibhamza.dev",
  },
  {
    id: "mediflow",
    title: "MediFlow",
    category: "HealthTech",
    description: "Clinic appointment booking and patient queue portal.",
    headerBg: "#151D28",
    dotColor: "#F59E0B",
    categoryColor: "#FBBF24",
    mockupType: "mediflow",
    year: "2023",
    role: "Frontend & Mobile Developer",
    overview:
      "Streamlined clinic scheduling system allowing patients to book slots, track live queue wait times, and access digital prescriptions.",
    challenge:
      "Crowded outpatient waiting rooms lacked live visibility into doctor availability and appointment delays.",
    solution:
      "Built a realtime Firebase queue board paired with an accessible mobile-first booking flow designed in Figma.",
    metrics: [
      "48% shorter lobby wait time",
      "25+ clinics onboarded",
      "WCAG AA accessible interface",
    ],
    stack: ["React", "Firebase", "HTML", "CSS", "UI/UX", "Figma"],
    liveUrl: "https://mediflow.shoaibhamza.dev",
  },
];

export const EXPERIENCE: TimelineEntry[] = [
  {
    period: "2023 - Present",
    role: "Full-Stack Developer",
    organization: "Freelance",
    detail:
      "Delivering end-to-end web & mobile products for startups and international clients.",
  },
  {
    period: "2022 - 2023",
    role: "Junior Developer",
    organization: "CodeWingz",
    detail:
      "Built responsive React dashboards, REST APIs, and reusable UI component libraries.",
  },
  {
    period: "2021 - Internship",
    role: "Web Development Intern",
    organization: "DevHouse",
    detail:
      "Collaborated on frontend layouts, bug fixes, and performance audits across client sites.",
  },
];

export const EDUCATION: TimelineEntry[] = [
  {
    period: "2022 - 2026",
    role: "BS Software Engineering",
    organization: "UMT Lahore",
    detail:
      "Focused on software architecture, data structures, databases, and human-computer interaction.",
  },
  {
    period: "2020 - 2022",
    role: "FSc Pre-Engineering",
    organization: "Punjab College",
    detail:
      "Strong foundation in mathematics, physics, and analytical problem-solving.",
  },
];

export const SKILLS: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Firebase",
  "Tailwind CSS",
  "Git",
  "Figma",
  "UI/UX",
];
