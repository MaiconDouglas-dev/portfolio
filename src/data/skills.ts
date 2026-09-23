export interface SkillGroup {
  id: string;
  categoryPt: string;
  categoryEn: string;
  badgePt: string;
  badgeEn: string;
  tier: 'primary' | 'secondary' | 'academic';
  summaryPt?: string;
  summaryEn?: string;
  itemsPt: string[];
  itemsEn: string[];
  items?: string[];
}

export const skillsInventory: SkillGroup[] = [
  {
    id: 'backend-java',
    categoryPt: 'Backend Java',
    categoryEn: 'Java Backend',
    badgePt: 'FOCO PRINCIPAL',
    badgeEn: 'CORE FOCUS',
    tier: 'primary',
    summaryPt: 'Meu principal foco de desenvolvimento: construção de APIs REST, lógica de negócio e persistência de dados com o ecossistema Spring.',
    summaryEn: 'My primary development focus: REST API engineering, business domain rules, and data persistence with Spring.',
    itemsPt: [
      'Java 21',
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'APIs REST / RESTful',
      'Spring Data JPA',
      'Hibernate',
      'JDBC',
      'DTOs',
      'Bean Validation',
      'Tratamento de Exceções',
      'Swagger / OpenAPI'
    ],
    itemsEn: [
      'Java 21',
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'REST / RESTful APIs',
      'Spring Data JPA',
      'Hibernate',
      'JDBC',
      'DTOs',
      'Bean Validation',
      'Exception Handling',
      'Swagger / OpenAPI'
    ],
    items: [
      'Java 21',
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'APIs REST / RESTful',
      'Spring Data JPA',
      'Hibernate',
      'JDBC',
      'DTOs',
      'Bean Validation',
      'Tratamento de Exceções',
      'Swagger / OpenAPI'
    ]
  },
  {
    id: 'database',
    categoryPt: 'Banco de Dados',
    categoryEn: 'Databases',
    badgePt: 'RELACIONAL & SQL',
    badgeEn: 'RELATIONAL & SQL',
    tier: 'primary',
    summaryPt: 'Modelagem relacional, normalização e manipulação de dados com foco no ecossistema Oracle e rotinas em PL/SQL.',
    summaryEn: 'Relational data modeling, normalization, and data manipulation centered on Oracle Database and PL/SQL.',
    itemsPt: [
      'SQL',
      'Oracle Database',
      'PL/SQL',
      'Modelagem Relacional',
      'Normalização',
      'JOINs',
      'Procedures',
      'Functions',
      'Triggers'
    ],
    itemsEn: [
      'SQL',
      'Oracle Database',
      'PL/SQL',
      'Relational Data Modeling',
      'Database Normalization',
      'JOINs',
      'Procedures',
      'Functions',
      'Triggers'
    ],
    items: [
      'SQL',
      'Oracle Database',
      'PL/SQL',
      'Modelagem Relacional',
      'Normalização',
      'JOINs',
      'Procedures',
      'Functions',
      'Triggers'
    ]
  },
  {
    id: 'devops-tools',
    categoryPt: 'DevOps, Cloud e Ferramentas',
    categoryEn: 'DevOps, Cloud & Tools',
    badgePt: 'INFRA & VERSIONAMENTO',
    badgeEn: 'INFRA & VERSIONING',
    tier: 'primary',
    summaryPt: 'Versionamento com Git, containerização de aplicações Spring Boot com Docker e noções de nuvem na Microsoft Azure.',
    summaryEn: 'Git version control, Spring Boot containerization with Docker, and cloud foundations on Microsoft Azure.',
    itemsPt: [
      'Git',
      'GitHub',
      'Docker',
      'Docker Compose',
      'Linux',
      'Microsoft Azure',
      'Azure CLI',
      'Azure Container Registry',
      'Azure Container Instances',
      'Fundamentos de CI/CD',
      'Deploy em Nuvem'
    ],
    itemsEn: [
      'Git',
      'GitHub',
      'Docker',
      'Docker Compose',
      'Linux',
      'Microsoft Azure',
      'Azure CLI',
      'Azure Container Registry',
      'Azure Container Instances',
      'CI/CD Foundations',
      'Cloud Deployment'
    ],
    items: [
      'Git',
      'GitHub',
      'Docker',
      'Docker Compose',
      'Linux',
      'Microsoft Azure',
      'Azure CLI',
      'Azure Container Registry',
      'Azure Container Instances',
      'Fundamentos de CI/CD',
      'Deploy em Nuvem'
    ]
  },
  {
    id: 'complementary',
    categoryPt: 'Conhecimentos Complementares',
    categoryEn: 'Complementary Knowledge',
    badgePt: 'COMPLEMENTAR',
    badgeEn: 'COMPLEMENTARY',
    tier: 'secondary',
    summaryPt: 'Tecnologias que estudei e utilizei ao longo da formação acadêmica e em projetos complementares.',
    summaryEn: 'Technologies studied and applied throughout academic projects and complementary exercises.',
    itemsPt: [
      'C#',
      '.NET',
      'ASP.NET Core',
      'React',
      'React Native',
      'Python',
      'MongoDB'
    ],
    itemsEn: [
      'C#',
      '.NET',
      'ASP.NET Core',
      'React',
      'React Native',
      'Python',
      'MongoDB'
    ],
    items: [
      'C#',
      '.NET',
      'ASP.NET Core',
      'React',
      'React Native',
      'Python',
      'MongoDB'
    ]
  },
  {
    id: 'academic-contact',
    categoryPt: 'Contato Acadêmico',
    categoryEn: 'Academic Exposure',
    badgePt: 'FORMAÇÃO TEÓRICA / ACADÊMICA',
    badgeEn: 'THEORETICAL / ACADEMIC',
    tier: 'academic',
    summaryPt: 'Áreas e conceitos com os quais tive contato durante a graduação em ADS, sem pretensão de domínio profissional imediato.',
    summaryEn: 'Concepts and domains explored during my university degree, representing conceptual academic contact.',
    itemsPt: [
      'Inteligência Artificial',
      'Machine Learning',
      'Ciência de Dados',
      'IoT',
      'LLMs',
      'RAG',
      'Embeddings'
    ],
    itemsEn: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'IoT',
      'LLMs',
      'RAG',
      'Embeddings'
    ],
    items: [
      'Inteligência Artificial',
      'Machine Learning',
      'Ciência de Dados',
      'IoT',
      'LLMs',
      'RAG',
      'Embeddings'
    ]
  }
];
