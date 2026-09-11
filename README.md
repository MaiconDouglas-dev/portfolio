<div align="center">

# 🚀 Maicon Douglas — Portfólio Profissional
### *Desenvolvedor Backend & Full Stack | Java 21/25 • Spring Boot 3 • .NET • Oracle (PL/SQL) • React Native*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Java](https://img.shields.io/badge/Java-21%20%2F%2025%20LTS-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3+-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Oracle Database](https://img.shields.io/badge/Oracle_DB-19c-F80000?style=for-the-badge&logo=oracle&logoColor=white)](https://www.oracle.com/database/)

<p align="center">
  <b>Uma aplicação web ultra-clean inspirada na estética Apple Pro Dark, projetada com foco em minimalismo sofisticado, respiro visual, alta performance e interatividade técnica profunda.</b>
</p>

[Visualizar Demonstração](#-como-executar-o-projeto-localmente) • [Diferenciais de Engenharia](#-diferenciais-e-funcionalidades) • [Arquitetura](#-estrutura-do-projeto) • [Contato](#-contato)

</div>

---

## 💎 Identidade Visual & Design System (Apple Pro Dark)

O portfólio foi desenhado com ergonomia visual e contraste refinado:

* **Preto Profundo & OLED (`#000000` / `#0c0c11`)**: Zero cinza-azulado genérico; superfície escura cinematográfica que economiza energia e não agride os olhos.
* **Gradiente de Keynote Apple**: Transição vibrante e harmoniosa:
  $$\text{Vermelho Carmesim (\#ff2d55)} \longrightarrow \text{Rubi (\#e11d48)} \longrightarrow \text{Violeta (\#8b5cf6)} \longrightarrow \text{Azul Elétrico (\#0a84ff)}$$
* **Apple System Green (`#30d158`)**: Aplicado estrategicamente em badges de status ativo (*"Disponível para Projetos"*), uptime de servidores, checagens de integridade e WhatsApp.
* **Tipografia Apple**: Textos primários em platina suave (`#f5f5f7`) e secundários em cinza neutro (`#a1a1a6`), garantindo legibilidade perfeita.

---

## ⚡ Diferenciais e Funcionalidades

### 1. Terminal Interativo de Backend (`TerminalCard`)
No topo da página, um terminal interativo simula a execução de requisições HTTP/2 REST reais da aplicação com comandos clicáveis:
- `GET /actuator/health` ➔ Status dos componentes, conexão com Oracle DB 19c e validação Flyway.
- `POST /api/v1/auth/login` ➔ Autenticação stateless OAuth2 / JWT emitindo tokens com roles RBAC (`ROLE_VETERINARIO`).
- `POST /api/v1/consultas` ➔ Verificação em tempo real de propriedade do pet pelo tutor e prevenção de conflitos de agenda médica.

### 2. Projeto Estrela: **Clyvo M-Vet API**
API corporativa de telemedicina e gestão clínica veterinária desenvolvida para a **Clyvo**, atendendo hospitais, clínicas, médicos com CRMV e tutores de pets.
* **Console Swagger / OpenAPI Interativo Embutido**: Recrutadores e tech leads podem inspecionar rotas, visualizar schemas JSON de requisição e simular o disparo de endpoints (`/auth/login`, `/veterinarios/{id}/clinicas`, `/consultas`, `/consultas/{id}/concluir`) diretamente no modal.
* **Diagrama Interativo de Arquitetura**: Visualizador visual do pipeline de ponta a ponta:
  $$\text{Client (React Native)} \longrightarrow \text{Spring Security (JWT/RBAC)} \longrightarrow \text{Domain Services} \longrightarrow \text{Oracle DB (Flyway DDL)}$$
* **100% de Preservação de Contratos**: Todas as regras de negócio foram desenhadas para garantir compatibilidade retroativa com o app mobile já publicado.

### 3. Projetos Complementares Autênticos
* **FoodFlow — Delivery Core & State Machine**: Sistema corporativo de pedidos com ciclo de vida em State Machine, pagamentos com chave de idempotência, Redis e PostgreSQL.
* **Customer BFF API**: Camada Backend-For-Frontend em .NET e TypeScript para agregação de microsserviços e consumo mobile leve.

### 4. Arsenal Técnico Filtrável (Skills)
Categorização em 4 pilares:
1. **Backend & APIs**: Java 21/25, Spring Boot 3, .NET / C#, OAuth 2.0, JWT, RESTful Semantic APIs.
2. **Bancos de Dados & Persistência**: Oracle Database 19c, PL/SQL (Procedures & Triggers), Flyway Migrations (`ddl-auto=validate`), PostgreSQL.
3. **Frontend & Mobile**: React, React Native, TypeScript, Tailwind CSS.
4. **DevOps & Cloud**: Docker (multi-stage builds), Azure Cloud, Git & GitHub CI/CD.

### 5. Contato Direto em 1 Clique & Minimalismo
- Interface ultra-clean: eliminamos formulários pesados em favor de 4 cards de ação direta (WhatsApp, E-mail, LinkedIn e GitHub).
- Acesso instantâneo com botão de copiar dados em 1 clique.
* Alternância instantânea de idioma (**Português 🇧🇷 / Inglês 🇺🇸**) com persistência em `localStorage`.
* Alternância de tema (**Dark OLED / Light Mode**).
* Botão de WhatsApp direto com mensagem personalizada pré-carregada.
* Ação de copiar telefone `(11) 93718-4412` e e-mail `maicondouglasdev1@gmail.com` com feedback visual imediato.

---

## 📂 Estrutura do Projeto

```text
maicon-portfolio/
├── public/
│   ├── favicon.svg             # Ícone vetorial com monograma "MD"
│   └── og-image.svg            # Card de compartilhamento social para WhatsApp/LinkedIn
├── src/
│   ├── app/
│   │   ├── globals.css         # Diretivas Tailwind, animações e paleta Apple
│   │   ├── layout.tsx          # RootLayout com metadados Open Graph e fontes
│   │   └── page.tsx            # Composição principal das seções
│   ├── components/
│   │   ├── Navbar.tsx          # Menu fixo com blur, switch PT/EN e tema
│   │   ├── Hero.tsx            # Apresentação, badges e CTAs de conversão
│   │   ├── TerminalCard.tsx    # Terminal interativo com simulação de endpoints
│   │   ├── About.tsx           # Trajetória, engenharia limpa e métricas reais
│   │   ├── Projects.tsx        # Bento Grid com Clyvo M-Vet em destaque
│   │   ├── ArchitectureModal.tsx # Diagrama interativo do ecossistema Clyvo
│   │   ├── ApiSwaggerModal.tsx # Console Swagger para teste de requisições
│   │   ├── Skills.tsx          # Abas técnicas com níveis de domínio
│   │   ├── Contact.tsx         # Cards de contato rápido e formulário direto
│   │   └── Footer.tsx          # Rodapé minimalista com status do sistema
│   ├── context/
│   │   └── AppContext.tsx      # Gerenciamento de tema (Dark/Light) e i18n
│   ├── data/
│   │   ├── projects.ts         # Metadados de projetos e mocks de API
│   │   ├── skills.ts           # Dicionário de habilidades técnicas
│   │   └── translations.ts     # Traduções completas PT-BR e EN-US
│   └── types/
│       └── index.ts            # Interfaces TypeScript
├── tailwind.config.js          # Configuração das cores AppleDark, AppleRed, etc.
├── tsconfig.json               # Configurações estritas de compilação
└── package.json
```

---

## 🛠 Como Executar o Projeto Localmente

### Pré-requisitos
* **Node.js**: Versão 18 ou superior instalada.
* **npm** ou **yarn / pnpm**.

### Passo a Passo
1. Clone o repositório:
   ```bash
   git clone git@github.com:MaiconDouglas-dev/portfolio.git
   cd portfolio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra no seu navegador:
   ```text
   http://localhost:3000
   ```

5. Para gerar e testar a build de produção otimizada:
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 Deploy em Produção (Vercel)

O projeto está 100% otimizado para deploy instantâneo na **[Vercel](https://vercel.com)**:
1. Conecte sua conta do GitHub na Vercel.
2. Importe o repositório `portfolio`.
3. Clique em **Deploy** (o framework `Next.js` é detectado automaticamente).

---

## 📬 Contato

<div align="center">

**Maicon Douglas**  
*Desenvolvedor Backend & Full Stack*

📱 **WhatsApp / Telefone**: [(11) 93718-4412](https://wa.me/5511937184412)  
📧 **E-mail**: [maicondouglasdev1@gmail.com](mailto:maicondouglasdev1@gmail.com)  
💼 **LinkedIn**: [linkedin.com/in/maicon-douglas-b244571b5](https://www.linkedin.com/in/maicon-douglas-b244571b5/)  
🐙 **GitHub**: [github.com/MaiconDouglas-dev](https://github.com/MaiconDouglas-dev)

</div>
