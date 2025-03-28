// src/server.ts (ou como você chama seu arquivo principal)
import app from "./app";
import connectDB from "./config/database";
import dotenv from "dotenv"; // Garanta que dotenv está aqui ou no app.ts ANTES de ser usado

dotenv.config(); // Carrega variáveis de ambiente o mais cedo possível

// Define a porta com um fallback caso não esteja definida no .env
const PORT = process.env.PORT || 3000; // Use 3000 como padrão, por exemplo

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      // Adiciona link direto para a documentação no console
      console.log(
        `Documentação Swagger UI disponível em http://localhost:${PORT}/api-docs`,
      );
    });
  })
  .catch((err: any) => {
    console.error("Erro ao conectar ao banco ou iniciar servidor:", err);
    process.exit(1); // Encerra o processo se não conseguir conectar/iniciar
  });
