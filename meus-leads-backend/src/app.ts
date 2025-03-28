// src/app.ts
import express from "express";
import path from "path"; // Para lidar com caminhos de arquivos
import swaggerUi from "swagger-ui-express"; // Para servir a UI do Swagger
import swaggerJsdoc from "swagger-jsdoc"; // Para gerar a especificação a partir dos comentários
import authRoutes from "./routes/authRoutes"; // Suas rotas de autenticação
import leadRoutes from "./routes/leadRoutes"; // Suas rotas de leads
import userRoutes from "./routes/userRoutes"; // Suas rotas de usuários
import dotenv from "dotenv"; // Para carregar variáveis de ambiente
const cors = require("cors"); // Para habilitar CORS

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a instância do aplicativo Express
const app = express();

// Middlewares básicos
app.use(express.json()); // Para parsear JSON no corpo das requisições
app.use(cors()); // Para habilitar Cross-Origin Resource Sharing

// --- Configuração do Swagger JSDoc ---
const swaggerOptions = {
  // Definição da estrutura base da especificação OpenAPI
  definition: {
    openapi: "3.0.0", // Versão da especificação OpenAPI
    info: {
      // Informações sobre a API
      title: "Meus Leads API", // Título da API
      version: "1.0.0", // Versão atual da API
      description:
        "API RESTful para gerenciamento de Leads, Usuários e Autenticação do sistema Meus Leads.",
      // Opcional: Informações de contato
      // contact: {
      //   name: "Seu Nome/Time",
      //   url: "http://seu-site.com",
      //   email: "contato@seu-email.com",
      // },
    },
    // Lista de servidores onde a API está hospedada
    servers: [
      {
        // Tenta pegar a porta do .env, senão usa 3000 como padrão
        url: `http://localhost:${process.env.PORT || 3000}/v1`,
        description: "Servidor de Desenvolvimento Local",
      },
      // Adicione aqui outros servidores (staging, produção) se necessário
      // {
      //   url: 'https://sua-api-producao.com/v1',
      //   description: 'Servidor de Produção'
      // }
    ],
    // Opcional: Definição de esquemas de segurança (ex: para JWT)
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: 'http',
    //       scheme: 'bearer',
    //       bearerFormat: 'JWT',
    //     }
    //   }
    // },
    // Opcional: Aplica a segurança globalmente
    // security: [{
    //   bearerAuth: []
    // }]
  },
  // Caminhos para os arquivos que contêm as anotações Swagger (@swagger)
  // Certifique-se que este padrão corresponde à localização dos seus arquivos de rotas
  apis: [
    "./src/routes/*.ts", // Inclui todos os arquivos .ts na pasta src/routes
    "./src/app.ts", // Pode incluir o próprio app.ts se houver definições aqui
  ],
};

// Gera a especificação Swagger com base nas opções e comentários JSDoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// --- Rota para servir a documentação Swagger UI ---
// A UI ficará disponível em /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Rota Raiz para servir uma página HTML básica de status ---
app.get("/", (req, res) => {
  // Constrói o caminho absoluto para o arquivo index.html na raiz do projeto
  // __dirname aponta para a pasta de execução do JS (normalmente 'dist')
  // '..' sobe um nível para a raiz do projeto
  const indexPath = path.join(__dirname, "..", "index.html");
  res.sendFile(indexPath, (err) => {
    // Adiciona um tratamento de erro caso o arquivo não seja encontrado
    if (err) {
      console.error("Erro ao enviar index.html:", err);
      res.status(500).send("Erro interno ao carregar a página inicial.");
    }
  });
});

// --- Definir as Rotas da API com prefixo /v1 ---
app.use("/v1/auth", authRoutes); // Rotas relacionadas à autenticação
app.use("/v1/leads", leadRoutes); // Rotas relacionadas aos leads
app.use("/v1/users", userRoutes); // Rotas relacionadas aos usuários

// Exporta a instância do app para ser usada em outros lugares (como no server.ts)
export default app;
