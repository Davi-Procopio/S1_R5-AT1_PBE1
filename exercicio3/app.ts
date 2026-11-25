import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const PORT: number = 8081;
app.use(express.json());

const USUARIO_ESPERADO: string = "admin";
const SENHA_ESPERADA: string = "1234";

app.post("/login", (req: Request, res: Response) => {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      res.status(400).json({
        erro: "Dados incompletos! Informe 'usuario' e 'senha' no corpo da requisição."
      });
      return;
    }

    if (typeof usuario !== "string" || typeof senha !== "string") {
      res.status(400).json({
        erro: "Os campos 'usuario' e 'senha' devem ser textos válidos."
      });
      return;
    }

    if (usuario !== USUARIO_ESPERADO || senha !== SENHA_ESPERADA) {
      res.status(401).json({
        erro: `Usuário '${usuario}' ou senha incorretos.`
      });
      return;
    }

    res.status(200).json({
      mensagem: `Login realizado com sucesso! Bem-vindo, ${usuario}!`
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno no servidor ao processar o login."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});