import { Project, ApiEndpointMock } from '@/types';

export const projects: Project[] = [
  {
    id: 'clyvo-m-vet',
    featured: true,
    number: '01',
    badgePt: 'PROJETO ESTRELA • ENTERPRISE',
    badgeEn: 'STAR PROJECT • ENTERPRISE',
    titlePt: 'Clyvo M-Vet — API de Gestão Veterinária & Teleatendimento',
    titleEn: 'Clyvo M-Vet — Veterinary Management & Telehealth API',
    subtitlePt: 'Ecossistema crítico para médicos veterinários, clínicas e tutores com Spring Boot 3 & Oracle DB',
    subtitleEn: 'Mission-critical ecosystem for veterinarians, clinics, and pet owners powered by Spring Boot 3 & Oracle DB',
    descPt: 'API corporativa desenvolvida para a Clyvo, responsável por orquestrar o atendimento veterinário completo. O sistema gerencia o relacionamento entre clínicas, médicos com registro CRMV, tutores e pacientes (pets), controlando permissões de prontuário, agendamentos sem colisão de agenda e emissão de orientações médicas protegidas.',
    descEn: 'Enterprise-grade API engineered for Clyvo, orchestrating end-to-end veterinary clinical care. The system governs the multi-tenant relationships between clinics, certified veterinarians (CRMV), pet owners, and animal patients, enforcing medical record authorizations, collision-free appointment scheduling, and encrypted clinical records.',
    tags: [
      'Java 21 / 25 / 25',
      'Spring Boot 3',
      'Spring Security',
      'JWT / OAuth 2.0',
      'Oracle Database',
      'PL/SQL',
      'Flyway',
      'Docker',
      'Azure Cloud',
      'Swagger / OpenAPI',
      'React Native Client'
    ],
    githubUrl: 'https://github.com/MaiconDouglas-dev',
    hasSwaggerModal: true,
    hasArchitectureModal: true,
    metrics: [
      { labelPt: 'Controle de Acesso', labelEn: 'Access Control', value: 'RBAC (3 Roles)' },
      { labelPt: 'Banco Relacional', labelEn: 'Relational DB', value: 'Oracle 19c' },
      { labelPt: 'Migrations', labelEn: 'Migrations', value: 'Flyway DDL' },
      { labelPt: 'Consumo Client', labelEn: 'Client App', value: 'React Native' },
    ],
    architectureHighlightsPt: [
      'Autenticação robusta com Spring Security, JWT assinado e controle de autoridades por perfil (ROLE_TUTOR, ROLE_VETERINARIO, ROLE_CLINICA).',
      'Regras de negócio sensíveis de agendamento: verificação de propriedade do pet pelo tutor e prevenção de duplicidade de horários para o veterinário.',
      'Persistência dedicada de Prontuário Clínico (medical records) vinculado a consultas concluídas, com autorização de acesso revogável.',
      'Isolamento e integridade de dados corporativos no Oracle DB através de migrations Flyway nativas e validação de schema JPA.'
    ],
    architectureHighlightsEn: [
      'Robust authentication via Spring Security, signed JWTs, and role-based authority resolution (ROLE_TUTOR, ROLE_VETERINARIO, ROLE_CLINICA).',
      'Critical appointment rules: strict pet ownership verification by authenticated tutor and zero-collision scheduling for doctors.',
      'Dedicated Clinical Electronic Health Record (EHR) persistence linked to completed consultations with revokable access permissions.',
      'Enterprise database isolation on Oracle DB with native Flyway SQL migrations and JPA schema validation.'
    ]
  },
  {
    id: 'foodflow',
    featured: false,
    number: '02',
    badgePt: 'BACKEND • STATE MACHINE',
    badgeEn: 'BACKEND • STATE MACHINE',
    titlePt: 'FoodFlow — Delivery Core & Máquina de Estados',
    titleEn: 'FoodFlow — Delivery Core & State Machine Engine',
    subtitlePt: 'Sistema de alta concorrência para pedidos, regras dinâmicas de cupons e pagamentos idempotentes',
    subtitleEn: 'High-concurrency order processing engine featuring state machines, dynamic pricing, and idempotent payments',
    descPt: 'Arquitetura de pedidos e delivery desenhada com foco em modelagem de domínio avançada. Implementa máquina de estados estrita para o ciclo de vida do pedido (CRIADO -> PAGO -> EM_PREPARO -> EM_ROTA -> ENTREGUE), cálculo dinâmico de taxas e processamento idempotente de pagamentos.',
    descEn: 'High-performance delivery order architecture built with rich domain modeling. Implements an explicit state machine controlling the order lifecycle, dynamic fee calculation, coupon evaluation, and payment idempotency preventing duplicate charges.',
    tags: [
      'Java 21 / 25 / 25',
      'Spring Boot',
      'State Machine',
      'PostgreSQL',
      'Redis Cache',
      'JUnit 5 & Mockito',
      'RESTful'
    ],
    githubUrl: 'https://github.com/MaiconDouglas-dev/FoodFlow',
    hasSwaggerModal: false,
    hasArchitectureModal: false,
    architectureHighlightsPt: [
      'Padrão State Machine para transições seguras de status de pedidos.',
      'Garantia de idempotência em transações financeiras e checkout.',
      'Camada de cache com Redis para consultas frequentes de cardápios.'
    ],
    architectureHighlightsEn: [
      'State Machine pattern ensuring deterministic order transitions.',
      'Idempotency key enforcement on financial checkouts.',
      'Redis caching layer for high-throughput menu lookups.'
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
    summaryPt: 'Listagem das clínicas conveniadas ao veterinário (tabela veterinario_clinica)',
    summaryEn: 'Retrieve clinics associated with the veterinarian (veterinario_clinica join)',
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
    summaryPt: 'Agendamento de consulta com validação estrita de tutor, pet e disponibilidade',
    summaryEn: 'Schedule consultation enforcing tutor pet ownership and doctor calendar check',
    role: 'ROLE_TUTOR',
    status: 201,
    requestBody: JSON.stringify({
      petId: 88,
      veterinarioId: 42,
      clinicaId: 10,
      dataHora: '2026-09-18T14:30:00',
      motivo: 'Acompanhamento pós-cirúrgico e vacinação'
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
    summaryPt: 'Conclusão de consulta médica com persistência definitiva do prontuário clínico',
    summaryEn: 'Complete clinical consultation and permanently persist medical health records',
    role: 'ROLE_VETERINARIO',
    status: 200,
    requestBody: JSON.stringify({
      diagnostico: 'Recuperação tecidual excelente, sem sinais inflamatórios.',
      prescricao: 'Manter analgesia preventiva por mais 48h.',
      clinicalNotes: 'Paciente apresentou peso estável (32.4kg). Vacina antirrábica aplicada com sucesso.'
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
