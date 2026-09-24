export type Language = 'pt' | 'en';
export type Theme = 'dark' | 'light';

export interface ProjectMetric {
  labelPt: string;
  labelEn: string;
  valuePt?: string;
  valueEn?: string;
  value?: string;
}

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
  tagsPt?: string[];
  tagsEn?: string[];
  githubUrl?: string;
  deployUrl?: string;
  swaggerUrl?: string;
  videoUrl?: string;
  hasSwaggerModal?: boolean;
  hasArchitectureModal?: boolean;
  isPlaceholder?: boolean;
  metrics?: ProjectMetric[];
  architectureHighlightsPt?: string[];
  architectureHighlightsEn?: string[];
}

export interface SkillCategory {
  id: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  items: {
    name: string;
    level: string;
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
