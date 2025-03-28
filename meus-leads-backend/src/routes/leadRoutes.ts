import express from "express";
import {
  createLead,
  updateLead,
  deleteLead,
  getLeads,
} from "../controllers/leadController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// POST /v1/leads
router.post("/", authMiddleware, createLead);

// PATCH /v1/leads/:id
router.patch("/:id", authMiddleware, updateLead);

// DELETE /v1/leads/:id
router.delete("/:id", authMiddleware, deleteLead);

// GET /v1/leads
router.get("/", authMiddleware, getLeads);

export default router;
