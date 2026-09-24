import { Project, ApiEndpointMock } from '@/types';

export const projects: Project[] = [
  {
    id: 'clyvo-m-vet',
    featured: true,
    number: '01',
    badgePt: 'PROJETO PRINCIPAL',
    badgeEn: 'FEATURED PROJECT',
    titlePt: 'Clyvo — Sistema de Gestão Veterinária',
    titleEn: 'Clyvo — Veterinary Management System',
    subtitlePt: 'Aplicação backend com Java, Spring Boot, APIs REST e persistência no Oracle Database',
    subtitleEn: 'Backend application built with Java, Spring Boot, REST APIs, and Oracle Database persistence',
    descPt: 'Aplicação desenvolvida para gerenciar o ecossistema de clínicas veterinárias, médicos com registro CRMV, tutores e pacientes (pets). Foco em modelagem relacional no Oracle, validação de regras de negócio, persistência com JPA e controle de permissões por roles com Spring Security.',
    descEn: 'Application designed to manage the clinical veterinary ecosystem: clinics, certified veterinarians (CRMV), pet owners, and animal patients. Focused on Oracle relational modeling, business rule validation, JPA persistence, and role-based access control with Spring Security.',
    tags: [
      'Java 21',
      'Spring Boot 3',
      'APIs REST',
      'Spring Security',
      'Oracle Database',
      'PL/SQL',
      'Docker',
      'Swagger / OpenAPI'
    ],
    tagsPt: [
      'Java 21',
      'Spring Boot 3',
      'APIs REST',
      'Spring Security',
      'Oracle Database',
      'PL/SQL',
      'Docker',
      'Swagger / OpenAPI'
    ],
    tagsEn: [
      'Java 21',
      'Spring Boot 3',
      'REST APIs',
      'Spring Security',
      'Oracle Database',
      'PL/SQL',
      'Docker',
      'Swagger / OpenAPI'
    ],
    githubUrl: 'https://github.com/MaiconDouglas-dev',
    hasSwaggerModal: true,
    hasArchitectureModal: true,
    isPlaceholder: false,
    metrics: [
      { labelPt: 'Controle de Acesso', labelEn: 'Access Control', valuePt: 'RBAC (Roles)', valueEn: 'RBAC (Roles)', value: 'RBAC (Roles)' },
      { labelPt: 'Banco de Dados', labelEn: 'Database', valuePt: 'Oracle Database', valueEn: 'Oracle Database', value: 'Oracle Database' },
      { labelPt: 'Rotinas & Dados', labelEn: 'Data Logic', valuePt: 'PL/SQL', valueEn: 'PL/SQL', value: 'PL/SQL' },
      { labelPt: 'Documentação', labelEn: 'Documentation', valuePt: 'Swagger / OpenAPI', valueEn: 'Swagger / OpenAPI', value: 'Swagger / OpenAPI' },
    ],
    architectureHighlightsPt: [
      'Autenticação com Spring Security e controle de acesso por perfil (ROLE_TUTOR, ROLE_VETERINARIO, ROLE_CLINICA).',
      'Regras de negócio de agendamento: verificação de propriedade do pet pelo tutor e prevenção de duplicidade de horários.',
      'Persistência estruturada de Prontuário Clínico vinculado a consultas finalizadas.',
      'Modelagem relacional e integridade de dados no Oracle Database com Spring Data JPA.'
    ],
    architectureHighlightsEn: [
      'Authentication via Spring Security and role-based access control (ROLE_TUTOR, ROLE_VETERINARIO, ROLE_CLINICA).',
      'Appointment scheduling rules: pet ownership verification by authenticated tutor and doctor schedule conflict prevention.',
      'Structured clinical electronic health record persistence linked to completed consultations.',
      'Relational data modeling and data integrity on Oracle Database with Spring Data JPA.'
    ]
  },
  {
    id: 'foodflow',
    featured: false,
    number: '02',
    badgePt: 'SLOT 02 • EM DESENVOLVIMENTO',
    badgeEn: 'SLOT 02 • IN PROGRESS',
    titlePt: 'FoodFlow — Sistema de Delivery',
    titleEn: 'FoodFlow — Delivery System',
    subtitlePt: 'Aplicação Full Stack estilo iFood com foco em arquitetura, domínio rico e regras de negócio',
    subtitleEn: 'Full Stack iFood-style delivery app focused on architecture, rich domain modeling and business rules',
    descPt: 'Sistema de delivery construído por etapas incrementais ("Dias") para praticar Java + Spring com foco em arquitetura profissional. Inclui setup com PostgreSQL via Docker Compose, migrações Flyway, health checks com Actuator, testes com Testcontainers e domínio de pedidos com aggregate Order. Planejado: state machine de pedidos, precificação/cupom, pagamentos com idempotência, eventos Pub/Sub e painel admin React.',
    descEn: 'Delivery system built in incremental stages ("Days") to practice Java + Spring with focus on professional architecture. Includes PostgreSQL via Docker Compose, Flyway migrations, Actuator health checks, Testcontainers testing and Order aggregate domain. Planned: order state machine, pricing/coupons, idempotent payments, Pub/Sub events and React admin panel.',
    tags: [
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'Docker Compose',
      'Flyway',
      'Testcontainers',
      'Actuator',
      'Domain-Driven Design'
    ],
    tagsPt: [
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'Docker Compose',
      'Flyway',
      'Testcontainers',
      'Actuator',
      'Domínio Rico (DDD)'
    ],
    tagsEn: [
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'Docker Compose',
      'Flyway',
      'Testcontainers',
      'Actuator',
      'Domain-Driven Design'
    ],
    githubUrl: 'https://github.com/MaiconDouglas-dev/FoodFlow',
    hasSwaggerModal: false,
    hasArchitectureModal: false,
    isPlaceholder: false,
    metrics: [
      { labelPt: 'Status', labelEn: 'Status', valuePt: 'Em Desenvolvimento', valueEn: 'In Progress', value: 'Em Desenvolvimento' },
      { labelPt: 'Banco de Dados', labelEn: 'Database', valuePt: 'PostgreSQL', valueEn: 'PostgreSQL', value: 'PostgreSQL' },
      { labelPt: 'Migrações', labelEn: 'Migrations', valuePt: 'Flyway', valueEn: 'Flyway', value: 'Flyway' },
      { labelPt: 'Testes', labelEn: 'Testing', valuePt: 'Testcontainers', valueEn: 'Testcontainers', value: 'Testcontainers' }
    ]
  },
  {
    id: 'chronos-dtn',
    featured: false,
    number: '03',
    badgePt: 'GATEWAY FINANCEIRO CISLUNAR',
    badgeEn: 'CISLUNAR FINANCIAL GATEWAY',
    titlePt: 'Chronos DTN — Gateway Financeiro Cislunar',
    titleEn: 'Chronos DTN — Cislunar Financial Gateway',
    subtitlePt: 'Roteamento de transações Terra-Lua com protocolo DTN, compensação relativística e alta tolerância a atrasos',
    subtitleEn: 'Earth-Moon transaction routing with DTN protocol, relativistic time dilation correction, and delay tolerance',
    descPt: 'Gateway financeiro distribuído desenvolvido para liquidação de transações no ambiente cislunar sob redes tolerantes a atrasos (DTN - RFC 4838). Arquitetado em Java 21 e Spring Boot 3.2.5, integra Spring Security 6 com autenticação stateless via JWT, persistência no Oracle Database com execução de Stored Procedure PL/SQL (SP_CORRIGIR_TEMPO_LUNAR) para calibração de dilatação temporal relativística, modelo hiperimídia com Spring HATEOAS, documentação interativa com Swagger UI/OpenAPI 2.5.0 e deploy ativo na nuvem (Render).',
    descEn: 'Distributed financial gateway engineered for transaction settlement in cislunar space over Delay-Tolerant Networks (DTN - RFC 4838). Built with Java 21 and Spring Boot 3.2.5, features Spring Security 6 stateless JWT authentication, Oracle Database persistence integrating PL/SQL stored procedure (SP_CORRIGIR_TEMPO_LUNAR) for relativistic time dilation calibration, hypermedia modeling via Spring HATEOAS, interactive OpenAPI 2.5.0 documentation with Swagger UI, and live cloud deployment on Render.',
    tags: [
      'Java 21',
      'Spring Boot 3',
      'Spring Security 6',
      'JWT Stateless',
      'Oracle Database',
      'PL/SQL',
      'Spring HATEOAS',
      'Swagger UI / OpenAPI',
      'Cloud Render',
      'DTN Protocol (RFC 4838)'
    ],
    tagsPt: [
      'Java 21',
      'Spring Boot 3',
      'Spring Security 6',
      'JWT Stateless',
      'Oracle Database',
      'PL/SQL',
      'Spring HATEOAS',
      'Swagger UI / OpenAPI',
      'Cloud Render',
      'Protocolo DTN (RFC 4838)'
    ],
    tagsEn: [
      'Java 21',
      'Spring Boot 3',
      'Spring Security 6',
      'JWT Stateless',
      'Oracle Database',
      'PL/SQL',
      'Spring HATEOAS',
      'Swagger UI / OpenAPI',
      'Cloud Render',
      'DTN Protocol (RFC 4838)'
    ],
    githubUrl: 'https://github.com/ChronosDTN/backend-java',
    deployUrl: 'https://backend-java-1-k1qi.onrender.com',
    swaggerUrl: 'https://backend-java-1-k1qi.onrender.com/swagger-ui.html',
    videoUrl: 'https://youtu.be/x-QlVsUXwqI',
    hasSwaggerModal: false,
    hasArchitectureModal: false,
    isPlaceholder: false,
    metrics: [
      { labelPt: 'Rede & Protocolo', labelEn: 'Network & Protocol', valuePt: 'DTN (RFC 4838)', valueEn: 'DTN (RFC 4838)', value: 'DTN (RFC 4838)' },
      { labelPt: 'Autenticação', labelEn: 'Authentication', valuePt: 'JWT Stateless', valueEn: 'JWT Stateless', value: 'JWT Stateless' },
      { labelPt: 'Rotinas & Banco', labelEn: 'DB & Stored Proc', valuePt: 'Oracle + PL/SQL', valueEn: 'Oracle + PL/SQL', value: 'Oracle + PL/SQL' },
      { labelPt: 'Maturidade REST', labelEn: 'REST Maturity', valuePt: 'HATEOAS (Lvl 3)', valueEn: 'HATEOAS (Lvl 3)', value: 'HATEOAS (Lvl 3)' }
    ],
    architectureHighlightsPt: [
      'Autenticação stateless via Spring Security 6 com filtro customizado JwtFilter e validação de tokens JJWT.',
      'Execução de Stored Procedure PL/SQL (SP_CORRIGIR_TEMPO_LUNAR) para calibração de carimbo temporal relativístico (400ms a 2.5s de atraso orbital).',
      'Arquitetura RESTful com navegação hiperimídia através de Spring HATEOAS (EntityModel).',
      'Documentação OpenAPI 3.0 via Swagger UI e deploy ativo em ambiente cloud conteinerizado (Render).'
    ],
    architectureHighlightsEn: [
      'Stateless authentication via Spring Security 6 with custom JwtFilter and JJWT token validation.',
      'Execution of Oracle PL/SQL Stored Procedure (SP_CORRIGIR_TEMPO_LUNAR) for relativistic timestamp calibration (400ms to 2.5s orbital delay).',
      'RESTful architecture with hypermedia resource navigation via Spring HATEOAS (EntityModel).',
      'OpenAPI 3.0 specification via Swagger UI and active cloud deployment on Render.'
    ]
  }
];

export const clyvoMockEndpoints: ApiEndpointMock[] = [
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    summaryPt: 'Autenticação de usuários (Tutor, Veterinário ou Clínica) e emissão de JWT',
    summaryEn: 'Authenticate user account (Tutor, Veterinarian or Clinic) and issue JWT',
    role: 'PÚBLICO',
    status: 200,
    requestBody: JSON.stringify({
      email: 'dr.marcelo.vet@clyvo.com.br',
      password: '••••••••••••'
    }, null, 2),
    responseBody: JSON.stringify({
      status: 'SUCCESS',
      tokenType: 'Bearer',
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      expiresIn: 86400,
      user: {
        id: 42,
        name: 'Dr. Marcelo Ribeiro',
        role: 'ROLE_VETERINARIO',
        crmv: '18492-SP',
        active: true
      }
    }, null, 2)
  },
  {
    method: 'GET',
    path: '/api/v1/veterinarios/{id}/clinicas',
    summaryPt: 'Listagem das clínicas conveniadas ao veterinário (relacionamento relacional)',
    summaryEn: 'Retrieve clinics associated with the veterinarian (relational join)',
    role: 'ROLE_VETERINARIO / ROLE_CLINICA',
    status: 200,
    responseBody: JSON.stringify([
      {
        idClinica: 10,
        razaoSocial: 'Hospital Veterinário Clyvo Care Salto',
        cnpj: '48.912.384/0001-90',
        statusVinculo: 'ATIVO',
        horariosAtendimento: 'Seg - Sex: 08:00 às 18:00'
      }
    ], null, 2)
  },
  {
    method: 'POST',
    path: '/api/v1/consultas',
    summaryPt: 'Agendamento de consulta com validação de tutor, pet e disponibilidade de agenda',
    summaryEn: 'Schedule consultation enforcing tutor pet ownership and doctor calendar check',
    role: 'ROLE_TUTOR',
    status: 201,
    requestBody: JSON.stringify({
      petId: 88,
      veterinarioId: 42,
      clinicaId: 10,
      dataHora: '2026-09-18T14:30:00',
      motivo: 'Acompanhamento de rotina e vacinação'
    }, null, 2),
    responseBody: JSON.stringify({
      idConsulta: 512,
      protocolo: 'CLY-2026-0918-0512',
      status: 'AGENDADA',
      pet: {
        id: 88,
        nome: 'Thor',
        especie: 'Canina',
        raca: 'Golden Retriever'
      },
      veterinario: 'Dr. Marcelo Ribeiro (CRMV 18492-SP)',
      clinica: 'Hospital Veterinário Clyvo Care Salto',
      autorizacaoProntuarioGerada: true
    }, null, 2)
  },
  {
    method: 'PUT',
    path: '/api/v1/consultas/{id}/concluir',
    summaryPt: 'Conclusão de consulta médica com registro do prontuário clínico',
    summaryEn: 'Complete clinical consultation and persist medical health records',
    role: 'ROLE_VETERINARIO',
    status: 200,
    requestBody: JSON.stringify({
      diagnostico: 'Recuperação clínica favorável, sem queixas.',
      prescricao: 'Manter acompanhamento preventivo.',
      clinicalNotes: 'Paciente com peso estável (32.4kg). Vacina aplicada com sucesso.'
    }, null, 2),
    responseBody: JSON.stringify({
      idConsulta: 512,
      status: 'CONCLUIDA',
      prontuarioId: 1044,
      dataConclusao: '2026-09-18T15:15:00',
      notificacaoEnviadaAoTutor: true
    }, null, 2)
  }
];
