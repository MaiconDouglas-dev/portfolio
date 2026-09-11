import { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    titlePt: 'Backend & APIs Corporativas',
    titleEn: 'Backend & Enterprise APIs',
    descriptionPt: 'Desenvolvimento de microsserviços, segurança em nível de camada e regras de negócio complexas.',
    descriptionEn: 'Microservices engineering, layered security, and complex transactional domain rules.',
    items: [
      {
        name: 'Java 21 / 25 / 25',
        level: 'Especialista',
        iconName: 'Cpu',
        descriptionPt: 'Records, Pattern Matching, Virtual Threads, Sequenced Collections e preparação para Java 25.',
        descriptionEn: 'Modern Java, Records, Pattern Matching, Virtual Threads, and roadmap to Java 25.'
      },
      {
        name: 'Spring Boot 3',
        level: 'Avançado',
        iconName: 'Server',
        descriptionPt: 'Spring MVC, Data JPA, Security, Actuator, Flyway e Testcontainers.',
        descriptionEn: 'Spring MVC, Data JPA, Security, Actuator, Flyway and Testcontainers.'
      },
      {
        name: '.NET / C#',
        level: 'Intermediário / Prático',
        iconName: 'Terminal',
        descriptionPt: 'ASP.NET Core Web APIs, Entity Framework Core e injeção de dependência.',
        descriptionEn: 'ASP.NET Core Web APIs, Entity Framework Core and Dependency Injection.'
      },
      {
        name: 'OAuth 2.0 & JWT',
        level: 'Avançado',
        iconName: 'ShieldCheck',
        descriptionPt: 'Autenticação stateless, controle RBAC por Roles e proteção contra brechas.',
        descriptionEn: 'Stateless authentication, RBAC authorization, and token lifecycle management.'
      },
      {
        name: 'RESTful Architecture',
        level: 'Avançado',
        iconName: 'Network',
        descriptionPt: 'Design semântico de contratos, idempotência, DTOs e versionamento de endpoints.',
        descriptionEn: 'Semantic contract design, idempotency, DTO mapping, and endpoint versioning.'
      }
    ]
  },
  {
    id: 'database',
    titlePt: 'Bancos de Dados & Persistência',
    titleEn: 'Databases & Persistence',
    descriptionPt: 'Modelagem relacional, tuning, integridade transacional e controle de versões via migrations.',
    descriptionEn: 'Relational data modeling, query tuning, ACID integrity, and migration versioning.',
    items: [
      {
        name: 'Oracle Database 19c',
        level: 'Avançado',
        iconName: 'Database',
        descriptionPt: 'Modelagem corporativa, tabelas intermediárias, sequences e constraints.',
        descriptionEn: 'Enterprise relational modeling, join tables, sequences, and foreign key constraints.'
      },
      {
        name: 'PL/SQL',
        level: 'Prático',
        iconName: 'Code2',
        descriptionPt: 'Stored procedures, packages, triggers e rotinas de automação no banco.',
        descriptionEn: 'Stored procedures, database packages, triggers, and automated database routines.'
      },
      {
        name: 'Flyway Migrations',
        level: 'Avançado',
        iconName: 'GitBranch',
        descriptionPt: 'Controle de versão de DDL/DML automatizado com ddl-auto=validate.',
        descriptionEn: 'Automated DDL/DML version control with ddl-auto=validate in production.'
      },
      {
        name: 'PostgreSQL',
        level: 'Avançado',
        iconName: 'Layers',
        descriptionPt: 'Modelagem relacional, índices, JSONB e persistência de alto volume.',
        descriptionEn: 'Relational modeling, indexing strategies, JSONB, and high-volume persistence.'
      }
    ]
  },
  {
    id: 'frontend-mobile',
    titlePt: 'Frontend & Mobile',
    titleEn: 'Frontend & Mobile',
    descriptionPt: 'Construção de clientes responsivos, rápidos e integrados com a camada de APIs.',
    descriptionEn: 'Building responsive, high-performance user interfaces consuming REST backends.',
    items: [
      {
        name: 'React',
        level: 'Avançado',
        iconName: 'Layout',
        descriptionPt: 'React 18+, Hooks personalizados, Context API, Tailwind e consumo de APIs.',
        descriptionEn: 'Modern React, custom Hooks, Context API, Tailwind CSS, and REST data fetching.'
      },
      {
        name: 'TypeScript',
        level: 'Avançado',
        iconName: 'FileCode',
        descriptionPt: 'Tipagem estrita de contratos, interfaces de domínio e garantia de integridade.',
        descriptionEn: 'Strict typing for API contracts, domain entities, and runtime safety.'
      },
      {
        name: 'React Native',
        level: 'Prático',
        iconName: 'Smartphone',
        descriptionPt: 'Desenvolvimento de apps mobile para iOS e Android integrados ao backend.',
        descriptionEn: 'Cross-platform mobile apps for iOS & Android directly communicating with APIs.'
      },
      {
        name: 'Tailwind CSS',
        level: 'Especialista',
        iconName: 'Palette',
        descriptionPt: 'Design systems modernos, temas dinâmicos (dark/light) e responsividade.',
        descriptionEn: 'Modern design systems, dynamic themes (dark/light), and pixel-perfect responsiveness.'
      }
    ]
  },
  {
    id: 'devops-cloud',
    titlePt: 'DevOps & Cloud',
    titleEn: 'DevOps & Cloud',
    descriptionPt: 'Contêineres, automação e esteiras de entrega contínua.',
    descriptionEn: 'Containers, automation, and continuous delivery pipelines.',
    items: [
      {
        name: 'Docker',
        level: 'Avançado',
        iconName: 'Box',
        descriptionPt: 'Dockerfile multi-stage para Java/Spring, Docker Compose para testes e serviços.',
        descriptionEn: 'Multi-stage Dockerfiles for Spring Boot, Docker Compose for local development.'
      },
      {
        name: 'Microsoft Azure',
        level: 'Prático',
        iconName: 'Cloud',
        descriptionPt: 'App Services, Container Apps, bancos gerenciados e monitoramento de logs.',
        descriptionEn: 'App Services, Container Apps, managed databases, and cloud logging.'
      },
      {
        name: 'Git & GitHub',
        level: 'Avançado',
        iconName: 'GitCommit',
        descriptionPt: 'Git flow, Pull Requests, code review e automações com GitHub Actions.',
        descriptionEn: 'Git flow, Pull Requests, collaborative code reviews, and GitHub Actions CI/CD.'
      }
    ]
  }
];
