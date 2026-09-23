<div align="center">

# 🚀 Maicon Douglas — Portfólio Profissional
### *Desenvolvedor Backend Java em Formação | Java 21 • Spring Boot 3 • Oracle Database (PL/SQL) • PostgreSQL • Docker • Azure*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3+-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Oracle Database](https://img.shields.io/badge/Oracle_DB-19c-F80000?style=for-the-badge&logo=oracle&logoColor=white)](https://www.oracle.com/database/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy_Live-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://maicondouglas-dev.vercel.app)

<p align="center">
  <b>Portfólio interativo moderno inspirado nas linguagens visuais da Apple Pro Dark e Lusion.co, unindo excelência em engenharia Backend Java a uma experiência sensorial com áudio procedural no estilo Interestelar e gráficos WebGL.</b>
</p>

[🌐 Acessar Portfólio Online](https://maicondouglas-dev.vercel.app) • [👨‍💻 Perfil Profissional](#-perfil-profissional--formação) • [⚡ Projetos em Destaque](#-projetos-em-destaque) • [🌌 Experiência Criativa & Áudio](#-experiência-criativa--tecnológica) • [🛠 Tecnologias](#-tecnologias--conhecimentos) • [📬 Contato](#-contato)

</div>

---

## 👨‍💻 Perfil Profissional & Formação

Sou desenvolvedor Backend Java em formação, cursando **Análise e Desenvolvimento de Sistemas (ADS)**, com foco dedicado na construção de aplicações escaláveis, resilientes e orientadas a boas práticas de engenharia de software utilizando o ecossistema **Java** e **Spring Boot**.

* **Ecossistema Java**: Minha principal área de especialização prática. Trabalho ativamente com Programação Orientada a Objetos (POO), Collections, tratamento robusto de exceções com `@ControllerAdvice`, Spring Boot 3, Spring Data JPA / Hibernate, Spring Security (autenticação stateless JWT e controle RBAC), DTOs, Bean Validation e documentação interativa com Swagger / OpenAPI.
* **Bancos de Dados Relacionais**:
  * **Oracle Database & PL/SQL**: Modelagem relacional, normalização, consultas analíticas com JOINs complexos, integridade referencial e criação de rotinas no banco como stored procedures, functions e triggers.
  * **PostgreSQL**: Integração com Spring Boot via JPA, versionamento de schemas com **Flyway Migrations** e containerização.
* **DevOps, Infraestrutura e Nuvem**: Experiência prática com **Docker** e **Docker Compose** para criação de ambientes locais consistentes, **Testcontainers** para testes de integração com bancos reais, Linux, Git/GitHub e fundamentos de nuvem na **Microsoft Azure** (Azure Container Registry e Azure Container Instances).
* **Visão Multidisciplinar**: Formação acadêmica ampla com vivência em C#/.NET, React, React Native, Python, Inteligência Artificial e IoT, permitindo comunicação de alto nível com times de Frontend, Mobile e Infraestrutura.
* 🎯 **Objetivo**: Atuar profissionalmente como **Desenvolvedor Backend Java**, contribuindo no design de microsserviços e APIs REST de alto impacto, persistência segura e arquitetura limpa.

---

## ⚡ Projetos em Destaque

### 1. 🏥 Clyvo — Sistema de Gestão Veterinária
> **Projeto Principal • Arquitetura Backend Completa**

Aplicação backend desenvolvida para gerenciar com segurança o ecossistema de clínicas veterinárias, médicos com registro CRMV, tutores e pacientes (pets). Foco em integridade de dados no Oracle Database, validação rigorosa de regras de negócio e controle de acessos.

* **Console Swagger / OpenAPI Interativo Embutido**: Recrutadores e engenheiros podem inspecionar schemas e simular a execução de requisições REST da API (`/auth/login`, `/veterinarios/{id}/clinicas`, `/consultas`, `/consultas/{id}/concluir`) diretamente dentro do modal interativo no portfólio.
* **Diagrama Interativo de Arquitetura**: Visualizador gráfico demonstrando o pipeline de dados:
  $$\text{Cliente (Mobile / Web)} \longrightarrow \text{Spring Security (JWT / RBAC)} \longrightarrow \text{Service Layer (Regras de Negócio)} \longrightarrow \text{Spring Data JPA} \longrightarrow \text{Oracle Database}$$
* **Regras de Negócio Implementadas**:
  - Prevenção de conflito de horários de atendimento entre veterinários.
  - Verificação rigorosa de titularidade do pet pelo tutor autenticado.
  - Persistência estruturada de Prontuários Clínicos vinculados a atendimentos concluídos.
* **Stack**: *Java 21, Spring Boot 3, Spring Security, Oracle Database 19c, PL/SQL, Docker, Swagger / OpenAPI.*

---

### 2. 🍔 FoodFlow — Sistema de Delivery & Pedidos em Tempo Real
> **Em Desenvolvimento • Arquitetura Profissional & Domínio Rico (DDD)**  
> 🔗 Repositório GitHub: **[github.com/MaiconDouglas-dev/FoodFlow](https://github.com/MaiconDouglas-dev/FoodFlow.git)**

Aplicação Full Stack estilo iFood estruturada em etapas incrementais planejadas ("Dias de Desenvolvimento") com foco em arquitetura profissional para alta volumetria de pedidos.

* **Arquitetura & Boas Práticas**:
  - **Ambiente Containerizado**: Banco de dados PostgreSQL 16 provisionado automaticamente via `docker-compose.yml`.
  - **Evolução de Schemas com Flyway**: Versionamento rigoroso de migrações DDL e DML para tabelas de restaurantes, cardápios, clientes e pedidos.
  - **Testes Confiáveis com Testcontainers**: Testes de repositório e serviços executados contra uma instância real de PostgreSQL em container Docker via JUnit 5.
  - **Domínio Rico (DDD)**: Aggregate raiz `Order` encapsulando transições válidas de ciclo de vida (Criado $\rightarrow$ Confirmado $\rightarrow$ Em Preparo $\rightarrow$ Saiu para Entrega $\rightarrow$ Entregue).
  - **Observabilidade**: Endpoints de monitoramento de métricas e integridade com **Spring Boot Actuator** (`/actuator/health`).
* **Próximos Passos Planejados**: Máquina de estados de pedidos, cálculo de precificação com cupons de desconto, pagamentos idempotentes, mensageria de eventos com Pub/Sub e painel administrativo em React.
* **Stack**: *Java 21, Spring Boot, PostgreSQL, Docker Compose, Flyway, Testcontainers, Spring Data JPA, Actuator.*

---

### 3. 💻 Terminal Interativo Spring Boot (`TerminalCard`)
Localizado na seção inicial do portfólio, este card interativo permite ao visitante simular requisições HTTP reais de endpoints da aplicação:
- `GET /actuator/health` ➔ Exibe o status `UP` dos microsserviços, conexão de banco de dados e disco.
- `POST /api/v1/auth/login` ➔ Simula a autenticação stateless emitindo payload JWT assinado com claims e perfil `ROLE_VETERINARIO`.

---

## 🌌 Experiência Criativa & Tecnológica

Inspirado nas técnicas dos estúdios **[Lusion.co](https://lusion.co/)** e na elegância do **Design System Apple Pro Dark**, o portfólio entrega uma experiência sensorial imersiva:

### 🎼 Trilha Sonora Procedural "Interestelar" (Web Audio API)
* **Composição Inspirada em Hans Zimmer**:
  - Síntese pura de **Órgão de Tubos de Catedral** (com harmônicos em flauta 8', principal 4' e oitava 2' com chorus acústico de pipes).
  - **Ostinato Hipnótico em Movimento ("Ticking Time")**: Arpejos pulsantes em 68 BPM sobre a icônica progressão harmônica:
    $$\text{Am (Lá menor)} \longrightarrow \text{F (Fá maior)} \longrightarrow \text{C (Dó maior)} \longrightarrow \text{G (Sol maior)}$$
  - **Sub-graves de Gargantua**: Drones de frequência sub-baixa (27Hz a 55Hz) reproduzindo a sensação física da gravidade de um buraco negro.
  - **Rede de Delay Espacial**: Simulação de reflexão acústica de nave com feedback suave.
* **100% Royalty-Free & Zero Latência**: Sem downloads de arquivos MP3 pesados; todo o som é gerado matematicamente pelo navegador em tempo real.
* **Controle Inteligente & Desbloqueio em 1 Clique**:
  - Pílula de controle com ícone inconfundível (`Volume2` / `VolumeX`), rótulo bilíngue explícito (`SOM` / `MUDO`) e equalizador animado via Canvas 2D.
  - **Sincronização Perfeita**: Em conformidade com as políticas de autoplay dos navegadores modernos, o som inicia suavemente no primeiro toque ou clique na página, ou imediatamente com apenas 1 clique no botão (sem necessidade de mutar e desmutar).

### 🪐 Universo Diamond WebGL 3D & Malha Gravitacional
* **850 Estrelas em Branco Diamante**: Distribuição volumétrica 3D com brilhos astronômicos autênticos, cintilação natural e tamanhos calibrados para não interferir na legibilidade do conteúdo.
* **Malha Topográfica Fluida 3D**: Deformação física por onda gravitacional interativa que responde à velocidade e posição do mouse.
* **Câmera 3D Reativa ao Scroll**: Profundidade e horizonte que se movem com suavidade durante a rolagem.

### 🖱️ Ergonomia & Navegação de Alta Precisão
* **Cursor Nativo do SO Preservado**: Seta original do macOS/Windows com resposta imediata de hardware, acompanhada por uma aura fluida translúcida de rastreio ultra-responsivo (lerp 0.65).
* **Botões Magnéticos Calibrados**: Efeito físico elástico sutil nos botões de navegação, sem sobreposições incômodas.
* **Rolagem Inercial com Lenis**: Momentum scroll suave e sem engasgos a 60-120fps.
* **Internacionalização Fluida (i18n)**: Suporte completo e instantâneo a Português do Brasil (`PT-BR`) e Inglês (`EN-US`) em todos os componentes e modais.

---

## 🛠 Tecnologias & Conhecimentos

### Backend & Arquitetura
* **Linguagens**: Java 21 (LTS), C# (.NET Core), TypeScript, JavaScript, SQL, PL/SQL.
* **Frameworks & Libs**: Spring Boot 3, Spring Data JPA, Spring Security, Spring MVC, Hibernate, Bean Validation, JUnit 5, Testcontainers, Flyway, Swagger / OpenAPI.
* **Conceitos de Engenharia**: RESTful APIs, Domain-Driven Design (DDD), Clean Architecture, Padrões GoF (Factory, Strategy, Builder, Singleton), Autenticação JWT, RBAC, Tratamento de Exceções Centralizado.

### Bancos de Dados & Persistência
* **Relacionais**: Oracle Database 19c (PL/SQL, Stored Procedures, Triggers, Views, Normalização), PostgreSQL 16.
* **NoSQL / Outros**: MongoDB, Redis (conceitual).

### DevOps, Nuvem & Ferramentas
* **Containers & Ambientes**: Docker, Docker Compose, Linux (Ubuntu/Debian, Bash).
* **Cloud**: Microsoft Azure (Azure Container Registry, Azure Container Instances, Azure CLI).
* **Versionamento & Deploy**: Git, GitHub, GitHub Actions (CI/CD), Vercel.

### Frontend Criativo & Sensorial
* Next.js 14 (App Router), React 18, Three.js, Web Audio API, Tailwind CSS, Framer Motion, Lenis Scroll, Lucide Icons.

---

## 📂 Estrutura do Projeto

```text
maicon-portfolio/
├── public/
│   ├── favicon.svg               # Monograma vetorial estilizado "MD"
│   └── og-image.svg              # Card de compartilhamento social
├── src/
│   ├── app/
│   │   ├── globals.css           # Estilos base, gradientes Apple e keyframes
│   │   ├── layout.tsx            # Layout mestre com SmoothScroll, Navbar e Footer
│   │   └── page.tsx              # Estrutura principal da página
│   ├── components/
│   │   ├── LusionBackground.tsx  # Canvas Three.js (estrelas diamante + malha gravitacional)
│   │   ├── AudioEqualizer.tsx    # Controle de áudio em pílula com espectro 2D
│   │   ├── CustomCursor.tsx      # Aura de rastreio de alta precisão para o mouse
│   │   ├── MagneticButton.tsx    # Atração magnética física para botões
│   │   ├── KineticText.tsx       # Títulos com tipografia cinética
│   │   ├── Navbar.tsx            # Header com controles de áudio, idioma e WhatsApp
│   │   ├── Hero.tsx              # Apresentação principal e TerminalCard
│   │   ├── TerminalCard.tsx      # Terminal interativo com simulação de endpoints Spring Boot
│   │   ├── About.tsx             # Trajetória, formação em ADS e competências
│   │   ├── Projects.tsx          # Vitrine de projetos (Clyvo e FoodFlow)
│   │   ├── ArchitectureModal.tsx # Diagrama interativo de arquitetura da API
│   │   ├── ApiSwaggerModal.tsx   # Console OpenAPI para simulação de requisições
│   │   ├── Skills.tsx            # Matriz detalhada de competências e stacks
│   │   ├── Contact.tsx           # Canais diretos de contato e formulário
│   │   ├── Footer.tsx            # Rodapé elegante e minimalista
│   │   ├── SoundFXListener.tsx   # Gatilhos globais de feedback sonoro tátil
│   │   └── SmoothScroll.tsx      # Integração com Lenis Scroll
│   ├── context/
│   │   └── AppContext.tsx        # Provedor global de estado e idioma (PT/EN)
│   ├── data/
│   │   ├── projects.ts           # Definição e endpoints mockados dos projetos
│   │   ├── skills.ts             # Dados estruturados de competências
│   │   └── translations.ts       # Dicionário bilíngue completo
│   ├── types/
│   │   └── index.ts              # Definições de tipagem TypeScript
│   └── utils/
│       └── audio.ts              # Motor procedural Web Audio (Interstellar Organ & Ostinato)
├── tailwind.config.js            # Design tokens, cores Apple OLED e animações
├── tsconfig.json                 # Configuração rigorosa de TypeScript
└── package.json                  # Dependências do projeto Next.js
```

---

## 🛠 Como Executar o Projeto Localmente

### Pré-requisitos
* **Node.js**: Versão 18.17 ou superior instalada.
* **npm** ou gerenciador equivalente (**pnpm**, **yarn**).

### Passo a Passo
1. Clone o repositório do portfólio:
   ```bash
   git clone git@github.com:MaiconDouglas-dev/portfolio.git
   cd portfolio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor local de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```text
   http://localhost:3000
   ```

5. Para gerar a versão de produção otimizada:
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 Deploy Contínuo (Vercel & GitHub)

O projeto está conectado ao GitHub no repositório [MaiconDouglas-dev/portfolio](https://github.com/MaiconDouglas-dev/portfolio). Cada atualização na branch principal (`main`) dispara um workflow automatizado de compilação, validação estática e publicação imediata na Vercel:

👉 **[https://maicondouglas-dev.vercel.app](https://maicondouglas-dev.vercel.app)**

---

## 📬 Contato

<div align="center">

**Maicon Douglas**  
*Desenvolvedor Backend Java em Formação*

📱 **WhatsApp**: [(11) 93718-4412](https://wa.me/5511937184412)  
📧 **E-mail**: [maicondouglasdev1@gmail.com](mailto:maicondouglasdev1@gmail.com)  
💼 **LinkedIn**: [linkedin.com/in/maicon-douglas-b244571b5](https://www.linkedin.com/in/maicon-douglas-b244571b5/)  
🐙 **GitHub**: [github.com/MaiconDouglas-dev](https://github.com/MaiconDouglas-dev)

</div>
