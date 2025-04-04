# 🚀 Meus Leads - Sistema Completo (Frontend + Backend)

[![Status](https://img.shields.io/badge/status-ativo-success.svg)]()
<!-- Adicione outros badges relevantes aqui, como status do build geral, se tiver CI/CD configurado -->

Bem-vindo ao repositório principal do **Meus Leads**, um sistema completo para gerenciamento de leads. Este projeto é dividido em duas partes principais:

1.  **Backend:** Uma API RESTful robusta construída com Node.js, Express, TypeScript e MongoDB.
2.  **Frontend:** Uma interface de usuário interativa e responsiva construída com React, Vite, TypeScript e Tailwind CSS.

O objetivo deste sistema é fornecer uma ferramenta prática e eficaz para equipes ou indivíduos que precisam capturar, organizar e acompanhar leads de vendas, contatos ou potenciais clientes.

---

**🔗 Links Importantes:**

*   **🚀 Aplicação Frontend Online:** **[https://leads-eosin.vercel.app/](https://leads-eosin.vercel.app/)**
*   **⚙️ API Backend Online:** **[https://leads-123.vercel.app/](https://leads-123.vercel.app/)**
*   **📚 Documentação da API (Swagger):** **[https://leads-123.vercel.app/api-docs/](https://leads-123.vercel.app/api-docs/)**

---

## 🏗️ Estrutura do Repositório

Este repositório organiza o projeto em duas pastas principais, cada uma contendo seu próprio código, dependências e configuração:

*   📁 `meus-leads/`: Contém todo o código da aplicação **Frontend** (React).
    *   Veja o [README detalhado do Frontend](./meus-leads/README.md) para instruções específicas de instalação, execução e tecnologias utilizadas.
*   📁 `meus-leads-backend/`: Contém todo o código da **API Backend** (Node.js/Express).
    *   Veja o [README detalhado do Backend](./meus-leads-backend/README.md) para instruções específicas de instalação, execução e tecnologias utilizadas.

## ✨ Funcionalidades Chave (Sistema Completo)

*   Interface amigável e intuitiva para gerenciamento de leads.
*   Autenticação segura de usuários (Login/Cadastro) utilizando Tokens JWT.
*   Operações CRUD (Criar, Ler, Atualizar, Deletar) completas para Leads.
*   Operações CRUD para Usuários (gerenciamento de contas).
*   Dashboard visual para acompanhamento rápido dos leads.
*   Design responsivo adaptado para diferentes tamanhos de tela.
*   API RESTful bem documentada com Swagger para fácil integração e testes.

## 🚀 Rodando Localmente (Sistema Completo)

Para executar o sistema completo em sua máquina local, você precisará iniciar o backend e o frontend separadamente, geralmente em dois terminais diferentes.

**1. Pré-requisitos:**
   *   Node.js (v18.x ou superior recomendado)
   *   npm ou yarn
   *   Uma instância do MongoDB rodando (localmente ou na nuvem como o Atlas)

**2. Rodando o Backend:**
   *   Navegue até a pasta do backend: `cd meus-leads-backend`
   *   Siga as instruções de instalação e configuração do `.env` presentes no [README do Backend](./meus-leads-backend/README.md).
   *   Execute o comando para iniciar o servidor de desenvolvimento (geralmente `npm run dev`).
   *   Certifique-se que a API esteja rodando na porta esperada (ex: `http://localhost:3000`).

**3. Rodando o Frontend:**
   *   Abra **outro terminal**.
   *   Navegue até a pasta do frontend: `cd ../meus-leads` (ou o caminho correto a partir da raiz).
   *   Siga as instruções de instalação e configuração do `.env` presentes no [README do Frontend](./meus-leads/README.md).
   *   **Importante:** No arquivo `.env` do frontend, configure a variável `VITE_API_BASE_URL` para apontar para a URL onde seu backend local está rodando (ex: `VITE_API_BASE_URL=http://localhost:3000/v1`).
   *   Execute o comando para iniciar o servidor de desenvolvimento (geralmente `npm run dev`).
   *   Acesse o frontend no seu navegador (geralmente em `http://localhost:5173`).

## 🤔 Por que essas Tecnologias?

A escolha das tecnologias para este projeto foi baseada em alguns fatores chave:

*   **TypeScript (Frontend & Backend):** Para adicionar tipagem estática ao JavaScript, o que aumenta a segurança do código, melhora a manutenibilidade em projetos maiores, facilita o refactoring e oferece uma experiência de desenvolvimento superior com melhor autocompletar e detecção de erros em tempo de compilação.
*   **React (Frontend):** Uma biblioteca extremamente popular e poderosa para construir interfaces de usuário componentizadas e reativas. Seu vasto ecossistema (React Router, bibliotecas de componentes como shadcn/ui) acelera o desenvolvimento. O uso do **Vite** como ferramenta de build proporciona um ambiente de desenvolvimento muito rápido (HMR quase instantâneo).
*   **Node.js + Express (Backend):** Uma combinação padrão de mercado, eficiente e flexível para criar APIs RESTful. Node.js é ótimo para operações assíncronas (como I/O de banco de dados), e o Express simplifica a criação de rotas, gerenciamento de requisições e middlewares. O grande número de pacotes NPM disponíveis facilita a adição de funcionalidades.
*   **MongoDB + Mongoose (Backend):** MongoDB foi escolhido por ser um banco de dados NoSQL flexível, bom para cenários onde os esquemas podem evoluir. **Mongoose** atua como uma camada de abstração sobre o driver nativo do MongoDB, facilitando a modelagem dos dados, validações de schema e interações com o banco no ambiente Node.js.
*   **Tailwind CSS (Frontend):** Um framework CSS utility-first que permite criar designs customizados rapidamente, escrevendo as classes diretamente no HTML. Isso agiliza a estilização e mantém a consistência visual, especialmente quando combinado com bibliotecas de componentes como **shadcn/ui**.
*   **JWT (Backend):** JSON Web Tokens são um padrão aberto (RFC 7519) para criar tokens de acesso que afirmam algumas informações (claims). É uma forma comum e segura de implementar autenticação e autorização em APIs stateless.
*   **Swagger (Backend):** Ferramenta essencial para documentar APIs RESTful. A geração automática da documentação a partir de comentários no código (`swagger-jsdoc`) e a interface interativa (`swagger-ui-express`) facilitam muito o teste e o consumo da API por outros desenvolvedores ou pelo próprio frontend.

## ☁️ Jornada de Deploy e Desafios

A hospedagem da aplicação foi realizada utilizando a plataforma **Vercel**, tanto para o frontend quanto para o backend. A Vercel foi escolhida por sua excelente integração com repositórios Git (como GitHub), facilidade de configuração para projetos Node.js e React, deploys automáticos a cada push, e uma generosa camada gratuita.

Um **desafio notável** foi encontrado durante a configuração inicial do deploy do **backend**:

*   **Erro `500: FUNCTION_INVOCATION_FAILED`:** Inicialmente, a API falhava ao ser implantada na Vercel. A investigação dos logs de *runtime* revelou o erro `Error: URI do MongoDB não definida`.
*   **Causa:** A aplicação estava tentando ler a string de conexão do MongoDB (`MONGO_URI`) a partir das variáveis de ambiente, mas esta variável não havia sido configurada no painel da Vercel. Diferente do ambiente local que lê o arquivo `.env`, a Vercel (e outras plataformas de nuvem) requer que as variáveis de ambiente de produção sejam explicitamente definidas em suas configurações.
*   **Solução:**
    1.  Acessar as configurações do projeto backend na Vercel (Settings -> Environment Variables).
    2.  Adicionar a variável `MONGO_URI` com o valor correto da string de conexão do MongoDB Atlas.
    3.  Garantir que outras variáveis essenciais (como `JWT_SECRET`) também estivessem configuradas.
    4.  Confirmar que o **IP Whitelist** no MongoDB Atlas permitia conexões de qualquer lugar (`0.0.0.0/0`), pois os IPs dos servidores Vercel não são fixos.

Após essas configurações, o backend foi implantado com sucesso e pôde conectar-se ao banco de dados.

## 🤝 Contribuindo

Se você deseja contribuir com este projeto, sinta-se à vontade para fazer um fork, criar uma branch com sua feature ou correção e abrir um Pull Request. Verifique os READMEs dos subprojetos para possíveis guias de contribuição mais específicos.

## 📄 Licença

Verifique os arquivos `LICENSE` ou `package.json` dentro dos diretórios `meus-leads/` e `meus-leads-backend/` para obter informações sobre as licenças específicas de cada parte do projeto. Geralmente, projetos React costumam usar MIT e projetos backend podem variar (no seu caso, o backend está como ISC).

---

*Este README oferece uma visão geral do sistema Meus Leads.*
