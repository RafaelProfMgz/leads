"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts (ou como você chama seu arquivo principal)
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const dotenv_1 = __importDefault(require("dotenv")); // Garanta que dotenv está aqui ou no app.ts ANTES de ser usado
dotenv_1.default.config(); // Carrega variáveis de ambiente o mais cedo possível
// Define a porta com um fallback caso não esteja definida no .env
const PORT = process.env.PORT || 3000; // Use 3000 como padrão, por exemplo
(0, database_1.default)()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        // Adiciona link direto para a documentação no console
        console.log(`Documentação Swagger UI disponível em http://localhost:${PORT}/api-docs`);
    });
})
    .catch((err) => {
    console.error("Erro ao conectar ao banco ou iniciar servidor:", err);
    process.exit(1); // Encerra o processo se não conseguir conectar/iniciar
});
