import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const PORT: number = 8081;
app.use(express.json());

// Rota POST /mensagem
app.post("/mensagem", (req: Request, res: Response) => {
  try {
    const { nome, idade, timeFavorito } = req.body;

    // 1. Valida se todos os campos obrigatórios foram enviados
    if (!nome || idade === undefined || idade === null || !timeFavorito) {
      res.status(400).json({
        erro: "Dados incompletos! Informe 'nome', 'idade' e 'timeFavorito' no corpo da requisição."
      });
      return;
    }

    // 2. Valida se a idade é um número válido e não negativo
    if (typeof idade !== "number" || isNaN(idade) || idade < 0) {
      res.status(400).json({
        erro: "O campo 'idade' deve ser um número válido e positivo."
      });
      return;
    }

    // 3. Retorna a frase formatada com sucesso
    res.status(200).json({
      mensagem: `Olá, ${nome}! Você tem ${idade} anos e torce para o ${timeFavorito}!`
    });
  } catch (error) {
    // Tratamento para qualquer erro inesperado na execução
    res.status(500).json({
      erro: "Erro interno no servidor ao processar a mensagem."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});