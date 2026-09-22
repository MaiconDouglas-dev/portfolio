export interface SkillGroup {
  id: string;
  categoryPt: string;
  categoryEn: string;
  badgePt: string;
  badgeEn: string;
  summaryPt: string;
  summaryEn: string;
  topics: {
    titlePt: string;
    titleEn: string;
    items: string[];
  }[];
}

export const detailedSkillsData: SkillGroup[] = [
  {
    id: 'backend-java',
    categoryPt: 'Backend Java & Spring Framework',
    categoryEn: 'Backend Java & Spring Framework',
    badgePt: 'STACK PRINCIPAL',
    badgeEn: 'CORE STACK',
    summaryPt: 'Minha principal área de atuação, desenvolvida na graduação em ADS e projetos práticos: da POO à arquitetura de APIs RESTful, segurança e persistência.',
    summaryEn: 'My primary development domain, built through academic training and production projects: from OOP foundations to secure REST APIs and persistence.',
    topics: [
      {
        titlePt: 'Java Core & Fundamentos',
        titleEn: 'Java Core & Fundamentals',
        items: [
          'Programação Orientada a Objetos',
          'Encapsulamento, Herança e Polimorfismo',
          'Collections Framework & Generics',
          'Tratamento de Exceções',
          'JDBC',
          'Estruturas de Dados e Algoritmos',
          'Java 21 / 25 LTS',
          'Virtual Threads & Records'
        ]
      },
      {
        titlePt: 'Ecossistema Spring',
        titleEn: 'Spring Ecosystem',
        items: [
          'Spring Boot 3',
          'Spring MVC',
          'Spring Security & OAuth 2.0 / JWT',
          'Spring Data JPA / Hibernate',
          'APIs RESTful Semânticas',
          'DTOs & Mappers',
          'Bean Validation',
          'Global Exception Handling',
          'Paginação & Ordenação',
          'Swagger / OpenAPI',
          'HATEOAS',
          'Arquitetura de Microsserviços'
        ]
      }
    ]
  },
  {
    id: 'database',
    categoryPt: 'Banco de Dados & Persistência',
    categoryEn: 'Databases & Persistence',
    badgePt: 'RELACIONAL & NOSQL',
    badgeEn: 'RELATIONAL & NOSQL',
    summaryPt: 'Modelagem rigorosa, desenvolvimento de rotinas em PL/SQL e integridade transacional ACID com foco no ecossistema Oracle e NoSQL com MongoDB.',
    summaryEn: 'Rigorous data modeling, PL/SQL routine development, and ACID transactional integrity centered on Oracle Database and MongoDB NoSQL.',
    topics: [
      {
        titlePt: 'Oracle Database & PL/SQL',
        titleEn: 'Oracle Database & PL/SQL',
        items: [
          'Oracle Database 19c',
          'SQL (DDL, DML, DQL)',
          'PL/SQL',
          'Stored Procedures & Functions',
          'Packages & Triggers',
          'Cursors & Sequences',
          'JOINs Complexos & Subqueries',
          'Modelagem Conceitual, Lógica e Relacional',
          'Normalização & Cardinalidade',
          'Integridade Referencial & Constraints'
        ]
      },
      {
        titlePt: 'NoSQL & Migrations',
        titleEn: 'NoSQL & Migrations',
        items: [
          'MongoDB (Coleções & Documentos)',
          'Flyway Migration Versioning',
          'PostgreSQL',
          'Estratégias de Indexação'
        ]
      }
    ]
  },
  {
    id: 'devops-cloud',
    categoryPt: 'DevOps, Cloud & Linux',
    categoryEn: 'DevOps, Cloud & Linux',
    badgePt: 'INFRAESTRUTURA MODERNA',
    badgeEn: 'MODERN INFRASTRUCTURE',
    summaryPt: 'Containerização, esteiras de entrega contínua, infraestrutura em nuvem na Microsoft Azure e administração de ambientes Linux.',
    summaryEn: 'Containerization, continuous integration/deployment, Microsoft Azure cloud infrastructure, and Linux server management.',
    topics: [
      {
        titlePt: 'Docker & Containers',
        titleEn: 'Docker & Containers',
        items: [
          'Containers & Imagens',
          'Dockerfile (Multi-stage builds)',
          'Docker Compose',
          'Volumes & Redes',
          'Containerização de aplicações Spring Boot',
          'Integração de aplicação e banco em containers'
        ]
      },
      {
        titlePt: 'Microsoft Azure & Linux',
        titleEn: 'Microsoft Azure & Linux',
        items: [
          'Azure CLI',
          'Máquinas Virtuais (VMs)',
          'VNET e Subnets',
          'Azure DevOps & Pipelines CI/CD',
          'Azure Container Registry (ACR)',
          'Azure Container Instances (ACI)',
          'Azure SQL Database',
          'Azure App Service',
          'Deploy de Aplicações em Nuvem',
          'Linux (Linha de Comando & Ambientes Cloud)'
        ]
      }
    ]
  },
  {
    id: 'engineering-qa',
    categoryPt: 'Engenharia de Software, Git & Qualidade',
    categoryEn: 'Software Engineering, Git & QA',
    badgePt: 'BOAS PRÁTICAS & MÉTODOS',
    badgeEn: 'BEST PRACTICES & METHODS',
    summaryPt: 'Processos de desenvolvimento ágil, versionamento colaborativo, documentação com UML e garantia de qualidade com testes automatizados.',
    summaryEn: 'Agile development methodologies, collaborative versioning, UML modeling, and automated testing quality assurance.',
    topics: [
      {
        titlePt: 'Git & Versionamento',
        titleEn: 'Git & Versioning',
        items: [
          'Git & GitHub',
          'Branches & Merges',
          'Repositórios Locais e Remotos',
          'Git Flow',
          'Organização e Commits Semânticos',
          'Desenvolvimento Colaborativo & PRs'
        ]
      },
      {
        titlePt: 'Engenharia & Testes',
        titleEn: 'Engineering & Testing',
        items: [
          'JUnit & Testes Unitários',
          'Pirâmide de Testes',
          'Shift-Left Testing',
          'SQA & SQC (Garantia e Controle de Qualidade)',
          'Modelos de Maturidade CMMI e TMMI',
          'Scrum & Waterfall',
          'Backlog de Produto & Sprint Planning',
          'Requisitos Funcionais e Não Funcionais',
          'UML (Casos de Uso e Diagramas de Atividade)'
        ]
      }
    ]
  },
  {
    id: 'frontend-mobile',
    categoryPt: 'Frontend & Mobile',
    categoryEn: 'Frontend & Mobile',
    badgePt: 'EXPERIÊNCIA DE USUÁRIO',
    badgeEn: 'USER EXPERIENCE',
    summaryPt: 'Criação de aplicações web e aplicativos mobile cross-platform que consomem APIs REST com alta performance e gerenciamento de estado previsível.',
    summaryEn: 'Building high-performance web applications and cross-platform mobile apps consuming REST APIs with predictable state management.',
    topics: [
      {
        titlePt: 'Desenvolvimento Web',
        titleEn: 'Web Development',
        items: [
          'HTML5 & CSS3 Moderno',
          'JavaScript (ES6+)',
          'React & Vite',
          'Tailwind CSS',
          'React Hooks',
          'React Hook Form',
          'Zod (Validação de Schema)',
          'Consumo e Tratamento de APIs REST'
        ]
      },
      {
        titlePt: 'Desenvolvimento Mobile',
        titleEn: 'Mobile Development',
        items: [
          'React Native',
          'Context API',
          'AsyncStorage',
          'TanStack Query',
          'Autenticação JWT',
          'Firebase Authentication',
          'Firebase Firestore'
        ]
      }
    ]
  },
  {
    id: 'emerging-tech',
    categoryPt: '.NET, Python, Inteligência Artificial & IoT',
    categoryEn: '.NET, Python, Artificial Intelligence & IoT',
    badgePt: 'VISÃO MULTIDISCIPLINAR',
    badgeEn: 'MULTIDISCIPLINARY PERSPECTIVE',
    summaryPt: 'Formação acadêmica expandida explorando frameworks corporativos alternativos, análise de dados em Python, IA generativa e sistemas embarcados.',
    summaryEn: 'Expanded foundation covering alternative enterprise frameworks, Python data analysis, generative AI, and embedded IoT systems.',
    topics: [
      {
        titlePt: '.NET & Python',
        titleEn: '.NET & Python',
        items: [
          'C# & ASP.NET Core',
          'Web API & Entity Framework Core',
          'Python & Estruturas de Dados',
          'Manipulação de Arquivos (JSON, XML, CSV)',
          'Pandas para Análise de Dados',
          'Consumo e Criação de APIs em Python'
        ]
      },
      {
        titlePt: 'Inteligência Artificial & IoT',
        titleEn: 'Artificial Intelligence & IoT',
        items: [
          'Fundamentos de IA & Ciência de Dados',
          'Machine Learning (Classificação & Regressão)',
          'LLMs & Prompt Engineering',
          'Embeddings & Arquitetura RAG',
          'NLU, STT e TTS',
          'Arduino, Sensores e Atuadores',
          'Protocolo MQTT & Node-RED',
          'Comunicação Serial (UART, I2C, SPI)',
          'Edge Computing & Integração IoT com Cloud'
        ]
      }
    ]
  }
];
