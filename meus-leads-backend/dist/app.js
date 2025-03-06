"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
// Conexão com o MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/meusleads")
    .then(function () { return console.log("Conectado ao MongoDB"); })
    .catch(function (err) { return console.log("Erro ao conectar ao MongoDB", err); });
// Definição de rotas
app.use("/api", authRoutes_1.default);
app.use("/api", leadRoutes_1.default);
exports.default = app;
