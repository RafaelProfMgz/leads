"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Rota de criação de usuário
router.post("/users", userController_1.createUser);
// Rota de autenticação de usuário
router.post("/users/auth", userController_1.authenticateUser);
// Rota para pegar todos os usuários
router.get("/users", userController_1.getAllUsers);
exports.default = router;
