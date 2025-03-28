import { Router } from "express";
import {
  createUser,
  authenticateUser,
  getAllUsers,
} from "../controllers/userController";

const router = Router();

// Rota de criação de usuário
router.post("/users", createUser);

// Rota de autenticação de usuário
router.post("/users/auth", authenticateUser);

// Rota para pegar todos os usuários
router.get("/users", getAllUsers);

export default router;
