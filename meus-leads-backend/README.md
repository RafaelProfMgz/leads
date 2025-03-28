# ⚙️ Meus Leads - Backend API (PT-BR)

[![Status](https://img.shields.io/badge/status-ativo-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/SEU_USUARIO/SEU_REPO_BACKEND)](https://github.com/SEU_USUARIO/SEU_REPO_BACKEND/issues)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](/LICENSE) <!-- Licença do package.json -->

API RESTful para o sistema "Meus Leads", responsável pelo gerenciamento de Leads, Usuários e Autenticação. Construída com Node.js, Express, TypeScript e MongoDB (via Mongoose).

---

**🔗 API Online (Backend):** **[https://leads-123.vercel.app/](https://leads-123.vercel.app/)**

**🚀 Frontend que consome esta API:** **[https://leads-eosin.vercel.app/](https://leads-eosin.vercel.app/)**

**📚 Documentação da API (Swagger):** **[https://leads-123.vercel.app/api-docs/](https://leads-123.vercel.app/api-docs/)**

---

## ✨ Funcionalidades Principais

*   Autenticação de Usuário via JWT (Login/Registro)
*   Operações CRUD completas para Leads
*   Operações CRUD completas para Usuários
*   Validações de dados de entrada (`express-validator`)
*   Middleware de autenticação para proteger rotas
*   Documentação de API gerada automaticamente com Swagger

## 🚀 Tecnologias Utilizadas
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)

*(Outras dependências incluem: bcrypt, cors, dotenv, express-validator)*

## 🛠️ Começando

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (v18.x ou superior recomendado)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
*   Uma instância do [MongoDB](https://www.mongodb.com/) (local ou na nuvem como o Atlas)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/RafaelProfMgz/leads/tree/main/meus-leads-backend
    cd meus-leads-backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto. Você precisará definir pelo menos as seguintes variáveis:
    ```env
    # String de conexão do seu banco MongoDB
    MONGO_URI=mongodb+srv://usuario:senha@seucluster...

    # Segredo para assinar os tokens JWT (pode ser qualquer string segura)
    JWT_SECRET=SEU_SEGREDO_SUPER_SECRETO

    # Porta para rodar localmente (opcional, Vercel define automaticamente)
    # PORT=3000
    ```

4.  **Execute o servidor em modo de desenvolvimento:**
    (Utiliza `ts-node` e `nodemon` para reiniciar automaticamente ao salvar)
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    A API estará rodando em `http://localhost:PORT` (o `PORT` definido no `.env` ou 3000 como fallback no seu `server.ts`).

5.  **Execute para produção (localmente):**
    Primeiro, compile o código TypeScript para JavaScript:
    ```bash
    npm run build
    # ou
    yarn build
    ```
    Depois, inicie o servidor a partir dos arquivos compilados na pasta `dist`:
    ```bash
    npm start
    # ou
    yarn start
    ```


## 📜 Scripts Disponíveis

*   `npm run dev` ou `yarn dev`: Inicia o servidor em modo de desenvolvimento usando `nodemon` e `ts-node`.
*   `npm run build` ou `yarn build`: Remove a pasta `dist` antiga, compila o código TypeScript para JavaScript na pasta `dist`, e copia o `index.html` para `dist`.
*   `npm start` ou `yarn start`: Executa o servidor a partir do código JavaScript compilado em `dist/server.js`. Usado em produção.
*   `npm run postinstall` ou `yarn postinstall`: Executado automaticamente após `npm install`, ajusta permissões do `tsc`. (Principalmente útil em alguns ambientes de CI/CD).

## 🏗️ Estrutura do Projeto

Uma visão geral da organização dos diretórios do projeto:

<details>
<summary>Clique para ver a estrutura</summary>

```plaintext
📦 meus-leads-backend
├── index.html         # Arquivo HTML básico, talvez servido na raiz '/' (copiado no build)
├── package.json       # Metadados, dependências e scripts
├── package-lock.json  # Lockfile das dependências
├── public             # (Pasta vazia ou para arquivos estáticos futuros)
├── README.md          # Este arquivo
├── src                # Código fonte principal da aplicação
│   ├── app.ts         # Configuração principal do Express (middlewares, rotas base)
│   ├── config         # Arquivos de configuração
│   │   └── database.ts# Lógica de conexão com o MongoDB (Mongoose)
│   ├── controllers    # Lógica de requisição/resposta (interage com serviços/modelos)
│   │   ├── authController.ts
│   │   ├── leadController.ts
│   │   └── userController.ts
│   ├── middleware     # Funções executadas entre requisição e rota final
│   │   ├── authMiddleware.ts # Verifica autenticação JWT
│   │   └── errorHandler.ts   # (Se existir) Middleware para tratamento de erros
│   ├── models         # Definições de Schema e Modelos do Mongoose
│   │   ├── Lead.ts
│   │   └── User.ts
│   ├── package-lock.json # Arquivo gerado incorretamente aqui? Deveria estar na raiz.
│   ├── routes         # Definição dos endpoints da API
│   │   ├── authRoutes.ts
│   │   ├── leadRoutes.ts
│   │   └── userRoutes.ts
│   ├── server.ts      # Ponto de entrada: conecta ao DB e inicia o servidor HTTP
│   ├── types          # Definições de tipos TypeScript personalizadas
│   │   └── express.d.ts # Extensão de tipos para o Request do Express
│   └── utils          # Funções utilitárias genéricas
│       └── asyncHandler.ts # Wrapper para lidar com async/await em rotas Express
├── tsconfig.json      # Configuração do compilador TypeScript
└── vercel.json        # Configuração de deploy para a Vercel
```
</details>


## 📚 API Endpoints & Documentação
Os endpoints da API estão definidos na pasta src/routes. Para uma visualização interativa e documentação detalhada, acesse a interface do Swagger UI:

https://leads-123.vercel.app/api-docs/

## 🤝 Contribuindo
Contribuições são bem-vindas! Por favor, siga estes passos:

Faça um Fork do Projeto

Crie sua Feature Branch (git checkout -b feature/FuncionalidadeIncrivel)

Faça o Commit suas alterações (git commit -m 'Adiciona alguma FuncionalidadeIncrivel')

Faça o Push para a Branch (git push origin feature/FuncionalidadeIncrivel)

Abra um Pull Request

## 📄 Licença
Este projeto está licenciado sob a Licença ISC - veja o arquivo LICENSE para mais detalhes (se existir) ou consulte o package.json.

