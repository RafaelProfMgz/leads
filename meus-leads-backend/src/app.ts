import express from "express";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());


// Definir todas as rotas com o prefixo /v1
app.use("/v1/auth", authRoutes); // Rota para autenticação
app.use("/v1/leads", leadRoutes); // Rota para leads
app.use("/v1/users", userRoutes); // Rota para usuários

export default app;
