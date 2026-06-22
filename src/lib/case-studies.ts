export type CaseStudySlug = "milowra" | "ArtGallery" | "forex" | "server";

export type FeatureBlock = {
  icon: string;
  title: string;
  desc: string;
};

export type CaseStudy = {
  slug: CaseStudySlug;
  title: string;
  tagline: string;
  summary: string;
  year: string;
  type: string;
  role: string;
  problem: string;
  overview: string;
  stack: string[];
  features: FeatureBlock[];
  highlights: { title: string; desc: string }[];
  challenges: { title: string; solution: string }[];
  outcome: string;
  lessons: string;
  image: string;
  videoPoster?: string;
  videoSrc?: string;
  flagship?: boolean;
};

const lumora_video = "/portfolio/assets/lumora.mp4";
const MILOWRA_video = "/portfolio/assets/milowra.mp4";
const MILOWRA = "/portfolio/assets/milowra.png";
const ArtGallery = "/portfolio/assets/ArtGallery.png";
const FOREX = "/portfolio/assets/forex.png";
const SERVER = "https://lh3.googleusercontent.com/aida-public/AB6AXuA6Q522E9Bvv5PgZGFEJJfvraFu7yWRTM3uNC0qzvs5xgZy-FOwDMfTBpMXjNiBy2Lk0BYgEXrwyWOfqHq2xc31oOknDFxTuiM2MIJPO2MGqFI7ukgF4hWtchsgyDsDy-xdjpUZjhVhrdNuwkr9PNnKBY70Y0xGehuyL27DHegZwd8tYeeMuVzNgc7Pnd-WJCX59ylx7YBFujMjK48aX4Z6hwBlvqUkTtD25WkOFoMGvvUXeEymKIge7BFcVysTtKSqnsWuRgx8ZKE";

export const CASE_STUDIES: Record<CaseStudySlug, CaseStudy> = {
  milowra: {
    slug: "milowra",
    title: "cases.milowra.title",
    tagline: "cases.milowra.tagline",
    summary: "cases.milowra.summary",
    year: "2026",
    type: "cases.milowra.type",
    role: "cases.milowra.role",
    problem: "cases.milowra.problem",
    overview: "cases.milowra.overview",
    stack: ["React", "Django", "PostgreSQL", "Python", "Tailwind CSS"],
    features: [
      { icon: "language", title: "cases.milowra.features.0.title", desc: "cases.milowra.features.0.desc" },
      { icon: "forum", title: "cases.milowra.features.1.title", desc: "cases.milowra.features.1.desc" },
      { icon: "admin_panel_settings", title: "cases.milowra.features.2.title", desc: "cases.milowra.features.2.desc" },
      { icon: "devices", title: "cases.milowra.features.3.title", desc: "cases.milowra.features.3.desc" }
    ],
    highlights: [
      { title: "cases.milowra.highlights.0.title", desc: "cases.milowra.highlights.0.desc" },
      { title: "cases.milowra.highlights.1.title", desc: "cases.milowra.highlights.1.desc" },
      { title: "cases.milowra.highlights.2.title", desc: "cases.milowra.highlights.2.desc" }
    ],
    challenges: [
      { title: "cases.milowra.challenges.0.title", solution: "cases.milowra.challenges.0.solution" },
      { title: "cases.milowra.challenges.1.title", solution: "cases.milowra.challenges.1.solution" }
    ],
    outcome: "cases.milowra.outcome",
    lessons: "cases.milowra.lessons",
    image: MILOWRA,
    videoPoster: MILOWRA,
    videoSrc: MILOWRA_video,
    flagship: true,
  },
  ArtGallery: {
    slug: "ArtGallery",
    title: "cases.ArtGallery.title",
    tagline: "cases.ArtGallery.tagline",
    summary: "cases.ArtGallery.summary",
    year: "2024",
    type: "cases.ArtGallery.type",
    role: "cases.ArtGallery.role",
    problem: "cases.ArtGallery.problem",
    overview: "cases.ArtGallery.overview",
    stack: ["Python", "Django", "PostgreSQL", "HTML", "CSS", "JavaScript"],
    features: [
      { icon: "groups", title: "cases.ArtGallery.features.0.title", desc: "cases.ArtGallery.features.0.desc" },
      { icon: "dashboard_customize", title: "cases.ArtGallery.features.1.title", desc: "cases.ArtGallery.features.1.desc" },
      { icon: "favorite", title: "cases.ArtGallery.features.2.title", desc: "cases.ArtGallery.features.2.desc" },
      { icon: "forum", title: "cases.ArtGallery.features.3.title", desc: "cases.ArtGallery.features.3.desc" },
      { icon: "storefront", title: "cases.ArtGallery.features.4.title", desc: "cases.ArtGallery.features.4.desc" },
      { icon: "language", title: "cases.ArtGallery.features.5.title", desc: "cases.ArtGallery.features.5.desc" },
      { icon: "translate", title: "cases.ArtGallery.features.6.title", desc: "cases.ArtGallery.features.6.desc" },
      { icon: "verified_user", title: "cases.ArtGallery.features.7.title", desc: "cases.ArtGallery.features.7.desc" }
    ],
    highlights: [
      { title: "cases.ArtGallery.highlights.0.title", desc: "cases.ArtGallery.highlights.0.desc" },
      { title: "cases.ArtGallery.highlights.1.title", desc: "cases.ArtGallery.highlights.1.desc" },
      { title: "cases.ArtGallery.highlights.2.title", desc: "cases.ArtGallery.highlights.2.desc" },
      { title: "cases.ArtGallery.highlights.3.title", desc: "cases.ArtGallery.highlights.3.desc" },
      { title: "cases.ArtGallery.highlights.4.title", desc: "cases.ArtGallery.highlights.4.desc" },
      { title: "cases.ArtGallery.highlights.5.title", desc: "cases.ArtGallery.highlights.5.desc" },
      { title: "cases.ArtGallery.highlights.6.title", desc: "cases.ArtGallery.highlights.6.desc" },
      { title: "cases.ArtGallery.highlights.7.title", desc: "cases.ArtGallery.highlights.7.desc" }
    ],
    challenges: [
      { title: "cases.ArtGallery.challenges.0.title", solution: "cases.ArtGallery.challenges.0.solution" },
      { title: "cases.ArtGallery.challenges.1.title", solution: "cases.ArtGallery.challenges.1.solution" },
      { title: "cases.ArtGallery.challenges.2.title", solution: "cases.ArtGallery.challenges.2.solution" }
    ],
    outcome: "cases.ArtGallery.outcome",
    lessons: "cases.ArtGallery.lessons",
    image: ArtGallery,
    videoPoster: lumora_video,
    videoSrc: lumora_video,
    flagship: true,
  },
  forex: {
    slug: "forex",
    title: "cases.forex.title",
    tagline: "cases.forex.tagline",
    summary: "cases.forex.summary",
    year: "2023",
    type: "cases.forex.type",
    role: "cases.forex.role",
    problem: "cases.forex.problem",
    overview: "cases.forex.overview",
    stack: ["Python", "Pandas", "NumPy", "Django"],
    features: [
      { icon: "insights", title: "cases.forex.features.0.title", desc: "cases.forex.features.0.desc" },
      { icon: "query_stats", title: "cases.forex.features.1.title", desc: "cases.forex.features.1.desc" },
      { icon: "schedule", title: "cases.forex.features.2.title", desc: "cases.forex.features.2.desc" },
      { icon: "dashboard", title: "cases.forex.features.3.title", desc: "cases.forex.features.3.desc" }
    ],
    highlights: [
      { title: "cases.forex.highlights.0.title", desc: "cases.forex.highlights.0.desc" },
      { title: "cases.forex.highlights.1.title", desc: "cases.forex.highlights.1.desc" },
      { title: "cases.forex.highlights.2.title", desc: "cases.forex.highlights.2.desc" }
    ],
    challenges: [
      { title: "cases.forex.challenges.0.title", solution: "cases.forex.challenges.0.solution" },
      { title: "cases.forex.challenges.1.title", solution: "cases.forex.challenges.1.solution" }
    ],
    outcome: "cases.forex.outcome",
    lessons: "cases.forex.lessons",
    image: FOREX,
  },
  server: {
    slug: "server",
    title: "cases.server.title",
    tagline: "cases.server.tagline",
    summary: "cases.server.summary",
    year: "Ongoing",
    type: "cases.server.type",
    role: "cases.server.role",
    problem: "cases.server.problem",
    overview: "cases.server.overview",
    stack: ["Docker", "PostgreSQL", "Redis", "Python", "Django"],
    features: [
      { icon: "lan", title: "cases.server.features.0.title", desc: "cases.server.features.0.desc" },
      { icon: "deployed_code", title: "cases.server.features.1.title", desc: "cases.server.features.1.desc" },
      { icon: "database", title: "cases.server.features.2.title", desc: "cases.server.features.2.desc" },
      { icon: "shield", title: "cases.server.features.3.title", desc: "cases.server.features.3.desc" }
    ],
    highlights: [
      { title: "cases.server.highlights.0.title", desc: "cases.server.highlights.0.desc" },
      { title: "cases.server.highlights.1.title", desc: "cases.server.highlights.1.desc" },
      { title: "cases.server.highlights.2.title", desc: "cases.server.highlights.2.desc" }
    ],
    challenges: [
      { title: "cases.server.challenges.0.title", solution: "cases.server.challenges.0.solution" },
      { title: "cases.server.challenges.1.title", solution: "cases.server.challenges.1.solution" }
    ],
    outcome: "cases.server.outcome",
    lessons: "cases.server.lessons",
    image: SERVER,
  },
};

export const CASE_STUDY_ORDER: CaseStudySlug[] = ["milowra", "ArtGallery", "forex", "server"];

export function getAdjacent(slug: CaseStudySlug) {
  const idx = CASE_STUDY_ORDER.indexOf(slug);
  const prev = idx > 0 ? CASE_STUDIES[CASE_STUDY_ORDER[idx - 1]] : null;
  const next = idx < CASE_STUDY_ORDER.length - 1 ? CASE_STUDIES[CASE_STUDY_ORDER[idx + 1]] : null;
  return { prev, next };
}