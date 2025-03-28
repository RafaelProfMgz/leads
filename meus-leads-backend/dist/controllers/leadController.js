"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeads = exports.deleteLead = exports.updateLead = exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
// Criar um lead
const createLead = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, email, phone, message } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: "Token inválido" });
    }
    // Validação dos campos
    if (!name || !phone) {
        return res
            .status(422)
            .json({ message: "Nome e telefone são obrigatórios" });
    }
    const lead = new Lead_1.default({ name, email, phone, message, userId });
    try {
        yield lead.save();
        res.status(201).json(lead);
    }
    catch (error) {
        console.error("Erro ao criar o lead:", error);
        res.status(500).json({ message: "Erro desconhecido ao criar lead" });
    }
}));
exports.createLead = createLead;
// Atualizar um lead
const updateLead = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { name, email, phone, message } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: "Token inválido" });
    }
    // Validação dos campos
    if (!name && !email && !phone && !message) {
        return res
            .status(422)
            .json({ message: "Pelo menos um campo deve ser atualizado" });
    }
    try {
        const lead = yield Lead_1.default.findOneAndUpdate({ _id: id, userId }, { name, email, phone, message }, { new: true });
        if (!lead) {
            return res.status(404).json({ message: "Lead não encontrado" });
        }
        res.status(200).json(lead);
    }
    catch (error) {
        console.error("Erro ao atualizar o lead:", error);
        res.status(500).json({ message: "Erro desconhecido ao atualizar o lead" });
    }
}));
exports.updateLead = updateLead;
// Deletar um lead
const deleteLead = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: "Token inválido" });
    }
    try {
        const lead = yield Lead_1.default.findOneAndDelete({ _id: id, userId });
        if (!lead) {
            return res.status(404).json({ message: "Lead não encontrado" });
        }
        res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao deletar o lead:", error);
        res.status(500).json({ message: "Erro desconhecido ao deletar o lead" });
    }
}));
exports.deleteLead = deleteLead;
// Pegar todos os leads
const getLeads = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: "Token inválido" });
    }
    try {
        const leads = yield Lead_1.default.find({ userId });
        if (leads.length === 0) {
            return res.status(404).json({ message: "Nenhum lead encontrado" });
        }
        res.status(200).json(leads);
    }
    catch (error) {
        console.error("Erro ao carregar os leads:", error);
        res.status(500).json({ message: "Erro desconhecido ao carregar os leads" });
    }
}));
exports.getLeads = getLeads;
