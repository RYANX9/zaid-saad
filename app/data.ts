export interface Project {
  id: string;
  idx: string;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  linkLabel: string;
}

export interface Skill {
  name: string;
  width: number; // 0-1
  tag: string;
}

export interface SocialLink {
  name: string;
  url: string;
  label: string;
}

export const personalInfo = {
  name: "Zaid Saad",
  tagline: "Full Stack Developer · Algeria",
  heroDesc:
    "Flutter & web developer. Firebase-backed systems. Building real, deployed products from M'sila — mobile, web, and data-driven.",
  email: "saad.zaid@univ-msila.dz",
  phone: "+213 552 896 422",
  whatsapp: "https://wa.me/213552896422",
  github: "https://github.com/saadzayd",
  linkedin: "#",
  photo: "/pic.png",
  available: true,
  year: 2025,
};

export const stats = [
  { num: "3", label: "Live Products" },
  { num: "5+", label: "Core Technologies" },
  { num: "M.Sc", label: "Computer Science · 2025" },
];

export const aboutContent = {
  headline: "Built to Last.",
  paragraphs: [
    "I build applications that hold — across <strong>mobile, web, and cloud</strong> — without compromising on performance or design intent. Deployed systems. Real users.",
    "M.Sc in Computer Science, Business Intelligence & Optimization, University of M'sila. The academic work informs every architectural decision I make.",
    "Based in Algeria. Available for freelance, remote, and full-time roles. Direct to work with.",
  ],
};

export const skills: Skill[] = [
  { name: "Flutter & Dart", width: 0.65, tag: "Active" },
  { name: "Firebase & GCP", width: 0.78, tag: "Solid" },
  { name: "HTML / CSS / JS", width: 0.68, tag: "Active" },
  { name: "Power BI & Analytics", width: 0.72, tag: "Solid" },
  { name: "Python & Data Science", width: 0.50, tag: "Building" },
];

export const projects: Project[] = [
  {
    id: "remp",
    idx: "01",
    title: "Smart Real Estate Platform",
    description:
      "Multi-role authenticated system connecting agencies, contractors, and engineers. Offline-capable with local data sync — built for real network conditions. Live and deployed.",
    tags: ["Flutter", "Firebase", "Google Cloud"],
    link: "https://remp-8b15c.web.app/",
    linkLabel: "Live",
  },
  {
    id: "urtec",
    idx: "02",
    title: "URTEC Bouma Web App",
    description:
      "Client intake and service portal for a real estate company. Responsive, bilingual-ready, Cloudinary-optimized. Production deployment handling real client-company workflows daily.",
    tags: ["HTML/CSS/JS", "Firebase", "Cloudinary"],
    link: "https://urtec-26aab.web.app/",
    linkLabel: "Live",
  },
  {
    id: "ewallet",
    idx: "03",
    title: "Data-Driven E-Wallet",
    description:
      "Institutional e-wallet built for companies and universities. Real-time analytics layer tracks usage patterns at scale — designed for operations teams, not just end users.",
    tags: ["HTML/CSS/JS", "Firebase", "Analytics"],
    link: null,
    linkLabel: "Private",
  },
  {
    id: "carrental",
    idx: "04",
    title: "Car Rental & Parts System",
    description:
      "Full management system for vehicle sales, rentals, and parts inventory. Real-time cloud sync across devices — covers the complete operational workflow from a single cross-platform app.",
    tags: ["Flutter", "Firebase", "Cloud Sync"],
    link: null,
    linkLabel: "Private",
  },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/saadzayd", label: "↗" },
  { name: "WhatsApp — +213 552 896 422", url: "https://wa.me/213552896422", label: "↗" },
  { name: "LinkedIn", url: "#", label: "↗" },
];

export const marqueeText = "Flutter · Firebase · Cloud · Analytics · ";
