import app from "./app";
import connectDB from "./config/database";

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error("Erro ao conectar ao banco:", err);
  });
