# 🎯 Meus Leads - Frontend (PT-BR)

[![Status](https://img.shields.io/badge/status-ativo-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
<!-- Adicione outros badges relevantes aqui, como status do build (GitHub Actions), cobertura de testes, etc. -->

Aplicação frontend para o sistema "Meus Leads", projetada para gerenciar leads de forma eficaz. Construída com React, Vite, TypeScript e estilizada com Tailwind CSS e shadcn/ui.

---

**🔗 API Online (Backend):** **[https://leads-123.vercel.app/](https://leads-123.vercel.app/)**

**🚀 Frontend que consome esta API:** **[https://leads-eosin.vercel.app/](https://leads-eosin.vercel.app/)**

**📚 Documentação da API (Swagger):** **[https://leads-123.vercel.app/api-docs/](https://leads-123.vercel.app/api-docs/)**

---

## ✨ Funcionalidades (Exemplo)

*   Autenticação de Usuário (Login/Cadastro)
*   Criação, Leitura, Atualização e Exclusão de Leads (CRUD)
*   Dashboard com Visão Geral dos Leads
*   Seção de Relatórios com Gráficos
*   Design Responsivo

## 🚀 Tecnologias Utilizadas
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white) ![Recharts](https://img.shields.io/badge/Recharts-8884d8?style=for-the-badge&logo=recharts&logoColor=white) ![React Icons](https://img.shields.io/badge/React_Icons-E91E63?style=for-the-badge&logo=react-icons&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## 🛠️ Começando

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (v18.x ou superior recomendado)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
*   API Backend rodando (garanta que a URL base esteja configurada corretamente).

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/RafaelProfMgz/leads/tree/main/meus-leads
    cd meus-leads
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto (copiando `.env.example` se existir, ou manualmente). Adicione as variáveis necessárias, por exemplo:
    ```env
    # Exemplo: URL base da sua API backend
    VITE_API_BASE_URL=http://localhost:3000/v1
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta que o Vite indicar).

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

*   `npm run dev` ou `yarn dev`:
    Executa o aplicativo em modo de desenvolvimento com Hot Module Replacement (HMR).
*   `npm run build` ou `yarn build`:
    Compila o aplicativo para produção (compila TypeScript e empacota com Vite) na pasta `dist`.
*   `npm run lint` ou `yarn lint`:
    Executa o ESLint no código para encontrar e potencialmente corrigir problemas de estilo e erros.
*   `npm run preview` ou `yarn preview`:
    Serve a build de produção localmente para pré-visualizar como ficará após o deploy.

## 🏗️ Estrutura do Projeto

Uma visão geral da organização dos diretórios do projeto:

<details>
<summary>Clique para ver a estrutura</summary>

```plaintext
📦 meus-leads
┣ 📂 public         # Arquivos estáticos (imagens, fontes, etc.) acessíveis diretamente
┃ ┗ 📜 scissors.svg # Ícone SVG de exemplo
┣ 📂 src            # Código fonte principal da aplicação
┃ ┣ 📂 components   # Componentes de UI reutilizáveis (Layouts, Cards, Modais, Botões)
┃ ┃ ┣ 📂 layout     # Componentes que definem a estrutura geral da página (Navbar, Footer)
┃ ┃ ┃ ┣ 📜 Footer.tsx
┃ ┃ ┃ ┣ 📜 Layout.tsx
┃ ┃ ┃ ┗ 📜 Navbar.tsx
┃ ┃ ┣ 📂 Lead       # Componentes especificamente relacionados a Leads
┃ ┃ ┃ ┣ 📂 Button
┃ ┃ ┃ ┃ ┗ 📜 CreateLeadButton.tsx
┃ ┃ ┃ ┣ 📜 LeadCard.tsx
┃ ┃ ┃ ┗ 📜 LeadList.tsx
┃ ┃ ┣ 📂 modal      # Componentes de Modal reutilizáveis
┃ ┃ ┃ ┗ 📜 ProfileModal.tsx
┃ ┃ ┣ 📜 Loading.tsx  # Componente genérico de indicador de carregamento
┃ ┃ ┗ 📜 NotFound.tsx # Componente para páginas 404 Not Found
┃ ┣ 📂 pages        # Componentes de rota de nível superior (views/páginas)
┃ ┃ ┣ 📂 Dashboard  # Páginas e modais relacionados ao Dashboard
┃ ┃ ┃ ┣ 📂 leads    # Modais específicos para ações de lead dentro do dashboard
┃ ┃ ┃ ┃ ┣ 📜 CreateLeadModal.tsx
┃ ┃ ┃ ┃ ┣ 📜 EditLeadModal.tsx
┃ ┃ ┃ ┃ ┗ 📜 RemoveLeadModal.tsx
┃ ┃ ┃ ┗ 📜 Dashboard.tsx # Componente principal da página do dashboard
┃ ┃ ┣ 📂 login      # Componente da página de Login
┃ ┃ ┃ ┗ 📜 Login.tsx
┃ ┃ ┣ 📂 Register   # Componente da página de Cadastro
┃ ┃ ┃ ┗ 📜 Register.tsx
┃ ┃ ┗ 📂 Report     # Componente da página de Relatórios
┃ ┃   ┗ 📜 Report.tsx
┃ ┣ 📂 routes       # Configuração de roteamento da aplicação
┃ ┃ ┗ 📜 Routes.tsx
┃ ┣ 📂 services     # Lógica de interação com API (ex: configuração da instância Axios)
┃ ┃ ┗ 📜 api.ts
┃ ┣ 📂 types        # Definições de tipos e interfaces TypeScript
┃ ┃ ┗ 📜 Leads.ts   # Exemplo de definição de tipo para dados de Lead
┃ ┣ 📂 utils        # Funções utilitárias/auxiliares
┃ ┃ ┣ 📜 logout.ts
┃ ┃ ┗ 📜 validateForm.ts
┃ ┣ 📜 App.tsx       # Componente raiz da aplicação (geralmente configura contexto/router)
┃ ┣ 📜 index.css    # Estilos globais ou ponto de entrada do Tailwind
┃ ┣ 📜 main.tsx     # Ponto de entrada principal da aplicação (renderiza App no DOM)
┃ ┗ 📜 vite-env.d.ts # Declarações de tipo para variáveis de ambiente do Vite
┣ 📜 eslint.config.mjs # Arquivo de configuração do ESLint (novo formato flat config)
┣ 📜 .gitignore    # Especifica arquivos não rastreados intencionalmente que o Git deve ignorar
┣ 📜 index.html      # Template HTML principal usado pelo Vite
┣ 📜 tailwind.config.js # Configuração do Tailwind CSS
┣ 📜 tsconfig.app.json  # Configuração TypeScript específica para a build da aplicação
┣ 📜 tsconfig.node.json # Configuração TypeScript para ambiente Node.js (ex: arquivos de config)
┣ 📜 vite.config.ts   # Arquivo de configuração do Vite
┣ 📜 package.json    # Metadados do projeto, dependências e scripts
┣ 📜 package-lock.json # Registra as versões exatas das dependências instaladas
┣ 📜 tsconfig.json    # Configuração TypeScript base
┗ 📜 README.md      # Este arquivo! Documentação do projeto.
---

## 🏁 Como Começar

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone <https://github.com/RafaelProfMgz/leads/tree/main/meus-leads>
    cd meus-leads
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install ou pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    *   Crie um arquivo `.env` na raiz do projeto.
    *   Adicione as variáveis necessárias. Exemplo:
        ```env
        VITE_API_BASE_URL=http://localhost:3000/api # Exemplo de URL da sua API backend
        ```
    *   *(Opcional, mas recomendado: Crie um arquivo `.env.example` com as chaves das variáveis necessárias, sem os valores sensíveis).*

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Abra seu navegador em [`http://localhost:5173`](http://localhost:5173) (ou a porta indicada pelo Vite).

---

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

*   `npm run dev`: Inicia o servidor de desenvolvimento com Hot Module Replacement (HMR).
*   `npm run build`: Compila e otimiza a aplicação para produção na pasta `dist/`.
*   `npm run lint`: Executa o ESLint para verificar erros e padrões de código.
*   `npm run preview`: Inicia um servidor local para visualizar a build de produção.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhoria, sinta-se à vontade para abrir uma [Issue](<https://github.com/RafaelProfMgz/leads/tree/main/meus-leads>/issues) ou enviar um [Pull Request](<https://github.com/RafaelProfMgz/leads/tree/main/meus-leads>/pulls).

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes (se aplicável).

```
