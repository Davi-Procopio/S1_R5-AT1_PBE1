import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const PORT: number = 8081;
app.use(express.json());

app.post("/soma", (req: Request, res: Response) => {
  try {
    const { num1, num2, num3 } = req.body;

    if (
      num1 === undefined ||
      num1 === null ||
      num2 === undefined ||
      num2 === null ||
      num3 === undefined ||
      num3 === null
    ) {
      res.status(400).json({
        erro: "Dados incompletos! Informe 'num1', 'num2' e 'num3' no corpo da requisição."
      });
      return;
    }

    if (
      typeof num1 !== "number" ||
      isNaN(num1) ||
      typeof num2 !== "number" ||
      isNaN(num2) ||
      typeof num3 !== "number" ||
      isNaN(num3)
    ) {
      res.status(400).json({
        erro: "Todos os campos ('num1', 'num2' e 'num3') devem conter valores numéricos válidos."
      });
      return;
    }

    const resultado: number = num1 + num2 + num3;

    res.status(200).json({
      soma: resultado
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno no servidor ao processar a soma."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});