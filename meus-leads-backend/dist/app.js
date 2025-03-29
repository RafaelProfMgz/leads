"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path")); // Para lidar com caminhos de arquivos
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express")); // Para servir a UI do Swagger
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc")); // Para gerar a especificação a partir dos comentários
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Suas rotas de autenticação
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes")); // Suas rotas de leads
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Suas rotas de usuários
const dotenv_1 = __importDefault(require("dotenv")); // Para carregar variáveis de ambiente
const cors = require("cors"); // Para habilitar CORS
// Carrega as variáveis de ambiente do arquivo .env
dotenv_1.default.config();
// Cria a instância do aplicativo Express
const app = (0, express_1.default)();
// Middlewares básicos
app.use(express_1.default.json()); // Para parsear JSON no corpo das requisições
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
            description: "API RESTful para gerenciamento de Leads, Usuários e Autenticação do sistema Meus Leads.",
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// --- Rota para servir a documentação Swagger UI ---
// A UI ficará disponível em /api-docs
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// --- Rota Raiz para servir uma página HTML básica de status ---
app.get("/", (req, res) => {
    // Constrói o caminho absoluto para o arquivo index.html na raiz do projeto
    // __dirname aponta para a pasta de execução do JS (normalmente 'dist')
    // '..' sobe um nível para a raiz do projeto
    const indexPath = path_1.default.join(__dirname, "..", "index.html");
    res.sendFile(indexPath, (err) => {
        // Adiciona um tratamento de erro caso o arquivo não seja encontrado
        if (err) {
            console.error("Erro ao enviar index.html:", err);
            res.status(500).send("Erro interno ao carregar a página inicial.");
        }
    });
});
// --- Definir as Rotas da API com prefixo /v1 ---
app.use("/v1/auth", authRoutes_1.default); // Rotas relacionadas à autenticação
app.use("/v1/leads", leadRoutes_1.default); // Rotas relacionadas aos leads
app.use("/v1/users", userRoutes_1.default); // Rotas relacionadas aos usuários
// Exporta a instância do app para ser usada em outros lugares (como no server.ts)
exports.default = app;
