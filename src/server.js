import express from "express";
import cors from "cors";
import receitaRouter from "./routers/receitaRouter.js";
import despesaRouter from "./routers/despesaRouter.js";
import userRouter from "./routers/userRouter.js";
import contaRouter from "./routers/contaRouter.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/receitas", receitaRouter);
app.use("/despesas", despesaRouter);
app.use("/users", userRouter);
app.use("/conta", contaRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
