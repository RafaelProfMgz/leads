"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leadController_1 = require("../controllers/leadController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// POST /v1/leads
router.post("/", authMiddleware_1.default, leadController_1.createLead);
// PATCH /v1/leads/:id
router.patch("/:id", authMiddleware_1.default, leadController_1.updateLead);
// DELETE /v1/leads/:id
router.delete("/:id", authMiddleware_1.default, leadController_1.deleteLead);
// GET /v1/leads
router.get("/", authMiddleware_1.default, leadController_1.getLeads);
exports.default = router;
