"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
// Definir todas as rotas com o prefixo /v1
app.use("/v1/auth", authRoutes_1.default); // Rota para autenticação
app.use("/v1/leads", leadRoutes_1.default); // Rota para leads
app.use("/v1/users", userRoutes_1.default); // Rota para usuários
exports.default = app;
