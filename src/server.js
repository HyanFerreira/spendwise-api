import express from "express";
import cors from "cors"
import receitaRouter from "./routers/receitaRouter.js"
import despesaRouter from "./routers/despesaRouter.js"


const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/receitas", receitaRouter)
app.use("/despesas", despesaRouter)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
