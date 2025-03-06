"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var leadController_1 = require("../controllers/leadController");
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
var router = express_1.default.Router();
// Rota para criar um lead
router.post("/", authMiddleware_1.default, leadController_1.createLead);
// Rota para listar os leads
router.get("/", authMiddleware_1.default, leadController_1.getLeads);
// Rota para atualizar um lead
router.put("/:id", authMiddleware_1.default, leadController_1.updateLead);
// Rota para deletar um lead
router.delete("/:id", authMiddleware_1.default, leadController_1.deleteLead);
exports.default = router;
