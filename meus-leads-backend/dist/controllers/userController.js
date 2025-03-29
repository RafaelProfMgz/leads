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
exports.getAllUsers = exports.authenticateUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Criar um usuário
const createUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ message: "Dados faltando ou inválidos" });
    }
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Email já está em uso" });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = new User_1.default({ name, email, password: hashedPassword });
    yield user.save();
    res.status(201).json({ message: "Usuário criado com sucesso!" });
}));
exports.createUser = createUser;
// Autenticar um usuário
const authenticateUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: "Dados faltando" });
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Usuário ou senha incorretos" });
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Usuário ou senha incorretos" });
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
    });
    res.status(200).json({ message: "Autenticado com sucesso", token });
}));
exports.authenticateUser = authenticateUser;
// Obter todos os usuários
const getAllUsers = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    res.status(200).json(users);
}));
exports.getAllUsers = getAllUsers;
