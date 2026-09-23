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
    githubUrl: 'https://github.com/MaiconDouglas-dev',
    hasSwaggerModal: true,
    hasArchitectureModal: true,
    isPlaceholder: false,
    metrics: [
      { labelPt: 'Controle de Acesso', labelEn: 'Access Control', value: 'RBAC (Roles)' },
      { labelPt: 'Banco de Dados', labelEn: 'Database', value: 'Oracle Database' },
      { labelPt: 'Rotinas & Dados', labelEn: 'Data Logic', value: 'PL/SQL' },
      { labelPt: 'Documentação', labelEn: 'Documentation', value: 'Swagger / OpenAPI' },
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
    id: 'backend-project-02',
    featured: false,
    number: '02',
    badgePt: 'SLOT 02 • EM BREVE',
    badgeEn: 'SLOT 02 • UPCOMING',
    titlePt: 'Projeto 02 — [Título a Definir]',
    titleEn: 'Project 02 — [Title TBD]',
    subtitlePt: 'Slot reservado para novo projeto Backend Java / APIs REST',
    subtitleEn: 'Reserved slot for upcoming Java Backend / REST APIs project',
    descPt: 'Espaço estruturado e reservado para a inclusão do seu próximo projeto backend. Este slot está pronto para receber regras de negócio, modelagem de banco de dados, documentação Swagger e especificações de arquitetura.',
    descEn: 'Structured slot reserved for your next backend development project. Ready to receive business logic, database design, Swagger API documentation, and architecture specs.',
    tags: [
      'Java 21',
      'Spring Boot 3',
      'APIs REST',
      'Spring Data JPA',
      'Banco Relacional',
      'Docker',
      'Swagger / OpenAPI'
    ],
    githubUrl: 'https://github.com/MaiconDouglas-dev',
    hasSwaggerModal: false,
    hasArchitectureModal: false,
    isPlaceholder: true,
    metrics: [
      { labelPt: 'Status', labelEn: 'Status', value: 'Slot Disponível' },
      { labelPt: 'Arquitetura', labelEn: 'Architecture', value: 'RESTful API' },
      { labelPt: 'Persistência', labelEn: 'Persistence', value: 'JPA / Hibernate' },
      { labelPt: 'Deploy', labelEn: 'Deployment', value: 'Docker' }
    ]
  },
  {
    id: 'backend-project-03',
    featured: false,
    number: '03',
    badgePt: 'SLOT 03 • EM BREVE',
    badgeEn: 'SLOT 03 • UPCOMING',
    titlePt: 'Projeto 03 — [Título a Definir]',
    titleEn: 'Project 03 — [Title TBD]',
    subtitlePt: 'Slot reservado para novo projeto de Integração, Cache ou Mensageria',
    subtitleEn: 'Reserved slot for integration, caching or messaging project',
    descPt: 'Espaço estruturado para o terceiro projeto do portfólio. Preparado para demonstração de comunicação assíncrona, cache distribuído, processamento em lote ou microsserviços.',
    descEn: 'Structured slot for the third portfolio project. Designed for asynchronous communication, distributed caching, batch processing, or microservices.',
    tags: [
      'Java',
      'Spring Boot',
      'Redis / Cache',
      'RabbitMQ / Kafka',
      'JUnit 5',
      'Docker Compose'
    ],
    githubUrl: 'https://github.com/MaiconDouglas-dev',
    hasSwaggerModal: false,
    hasArchitectureModal: false,
    isPlaceholder: true,
    metrics: [
      { labelPt: 'Status', labelEn: 'Status', value: 'Slot Disponível' },
      { labelPt: 'Processamento', labelEn: 'Processing', value: 'Assíncrono' },
      { labelPt: 'Testes', labelEn: 'Testing', value: 'JUnit 5' },
      { labelPt: 'Ambiente', labelEn: 'Environment', value: 'Containerizado' }
    ]
  },
  {
    id: 'backend-project-04',
    featured: false,
    number: '04',
    badgePt: 'SLOT 04 • EM BREVE',
    badgeEn: 'SLOT 04 • UPCOMING',
    titlePt: 'Projeto 04 — [Título a Definir]',
    titleEn: 'Project 04 — [Title TBD]',
    subtitlePt: 'Slot reservado para novo projeto Cloud Native, DevOps ou Microsserviços',
    subtitleEn: 'Reserved slot for Cloud Native, DevOps or Microservices project',
    descPt: 'Espaço estruturado para o quarto projeto backend. Pronto para expor pipelines CI/CD, esteiras de entrega na nuvem (Azure), observabilidade com Spring Actuator e conteinerização.',
    descEn: 'Structured slot for the fourth backend project. Ready to showcase CI/CD pipelines, cloud deployment (Azure), Actuator observability, and containerization.',
    tags: [
      'Java 21',
      'Spring Boot 3',
      'Microsoft Azure',
      'Docker',
      'CI/CD Pipelines',
      'Linux'
    ],
    githubUrl: 'https://github.com/MaiconDouglas-dev',
    hasSwaggerModal: false,
    hasArchitectureModal: false,
    isPlaceholder: true,
    metrics: [
      { labelPt: 'Status', labelEn: 'Status', value: 'Slot Disponível' },
      { labelPt: 'Nuvem', labelEn: 'Cloud Provider', value: 'Microsoft Azure' },
      { labelPt: 'CI/CD', labelEn: 'CI/CD', value: 'GitHub Actions' },
      { labelPt: 'Monitoramento', labelEn: 'Monitoring', value: 'Spring Actuator' }
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
