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
