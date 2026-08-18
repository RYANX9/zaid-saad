interface SiteData {
  personalInfo: unknown;
  stats: unknown;
  aboutContent: unknown;
  skills: unknown;
  projects: unknown;
  socialLinks: unknown;
  marqueeText: string;
}

export function generateDataFile(data: SiteData): string {
  return `export interface Project {
  id: string;
  idx: string;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  linkLabel: string;
  image?: string;
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

export const personalInfo = ${JSON.stringify(data.personalInfo, null, 2)};

export const stats = ${JSON.stringify(data.stats, null, 2)};

export const aboutContent = ${JSON.stringify(data.aboutContent, null, 2)};

export const skills: Skill[] = ${JSON.stringify(data.skills, null, 2)};

export const projects: Project[] = ${JSON.stringify(data.projects, null, 2)};

export const socialLinks: SocialLink[] = ${JSON.stringify(data.socialLinks, null, 2)};

export const marqueeText = ${JSON.stringify(data.marqueeText)};
`;
}
