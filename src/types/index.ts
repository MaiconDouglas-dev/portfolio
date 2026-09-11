export type Language = 'pt' | 'en';
export type Theme = 'dark' | 'light';

export interface Project {
  id: string;
  featured: boolean;
  number: string;
  badgePt: string;
  badgeEn: string;
  titlePt: string;
  titleEn: string;
  subtitlePt: string;
  subtitleEn: string;
  descPt: string;
  descEn: string;
  tags: string[];
  githubUrl?: string;
  hasSwaggerModal?: boolean;
  hasArchitectureModal?: boolean;
  metrics?: {
    labelPt: string;
    labelEn: string;
    value: string;
  }[];
  architectureHighlightsPt: string[];
  architectureHighlightsEn: string[];
}

export interface SkillCategory {
  id: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  items: {
    name: string;
    level: string; // e.g., 'Avançado', 'Prático', 'Em Produção'
    iconName: string;
    descriptionPt: string;
    descriptionEn: string;
  }[];
}

export interface ApiEndpointMock {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  summaryPt: string;
  summaryEn: string;
  role: string;
  requestBody?: string;
  responseBody: string;
  status: number;
}
