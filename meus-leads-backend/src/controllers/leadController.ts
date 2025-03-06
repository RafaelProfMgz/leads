import { Request, Response } from "express";
import Lead from "../models/Lead";
import asyncHandler from "../utils/asyncHandler";

// Extend the Request interface locally
declare module "express" {
  interface Request {
    user?: {
      id: string;
    };
  }
}

// Criar um lead
const createLead = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Token inválido" });
  }

  // Validação dos campos
  if (!name || !phone) {
    return res
      .status(422)
      .json({ message: "Nome e telefone são obrigatórios" });
  }

  const lead = new Lead({ name, email, phone, message, userId });

  try {
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    console.error("Erro ao criar o lead:", error);
    res.status(500).json({ message: "Erro desconhecido ao criar lead" });
  }
});

// Atualizar um lead
const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, message } = req.body;
  const userId = req.user?.id;

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
    const lead = await Lead.findOneAndUpdate(
      { _id: id, userId },
      { name, email, phone, message },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead não encontrado" });
    }

    res.status(200).json(lead);
  } catch (error) {
    console.error("Erro ao atualizar o lead:", error);
    res.status(500).json({ message: "Erro desconhecido ao atualizar o lead" });
  }
});

// Deletar um lead
const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Token inválido" });
  }

  try {
    const lead = await Lead.findOneAndDelete({ _id: id, userId });

    if (!lead) {
      return res.status(404).json({ message: "Lead não encontrado" });
    }

    res.status(204).send(); // Sucesso, mas sem conteúdo
  } catch (error) {
    console.error("Erro ao deletar o lead:", error); // Log do erro para depuração
    res.status(500).json({ message: "Erro desconhecido ao deletar o lead" });
  }
});

// Pegar todos os leads
const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Token inválido" });
  }

  try {
    const leads = await Lead.find({ userId });
    if (leads.length === 0) {
      return res.status(404).json({ message: "Nenhum lead encontrado" });
    }
    res.status(200).json(leads); // Retorna os leads encontrados
  } catch (error) {
    console.error("Erro ao carregar os leads:", error); // Log do erro para depuração
    res.status(500).json({ message: "Erro desconhecido ao carregar os leads" });
  }
});

export { createLead, updateLead, deleteLead, getLeads };
