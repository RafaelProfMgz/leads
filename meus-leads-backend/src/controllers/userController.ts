import { Request, Response } from "express";
import User from "../models/User";
import asyncHandler from "../utils/asyncHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Criar um usuário
const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ message: "Dados faltando ou inválidos" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email já está em uso" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: "Usuário criado com sucesso!" });
});

// Autenticar um usuário
const authenticateUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Dados faltando" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Usuário ou senha incorretos" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Usuário ou senha incorretos" });
  }
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Autenticado com sucesso", token });
});

// Obter todos os usuários
const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json(users);
});

export { createUser, authenticateUser, getAllUsers };
