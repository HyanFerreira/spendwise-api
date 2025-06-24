import express from "express";
import cors from "cors";
import receitaRouter from "./routers/receitaRouter.js";
import despesaRouter from "./routers/despesaRouter.js";
import userRouter from "./routers/userRouter.js";
import contaRouter from "./routers/contaRouter.js";
import cartaoCreditoRouter from "./routers/cartaoCreditoRouter.js";
import categoriasRouter from "./routers/categoriasRouter.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import {logger} from "./middlewares/logger.js";
import {notFoundController} from "./controller/notFoundController.js";
import pdfRouter from "./routers/pdfRouter.js"
import {homepage} from "./controller/homepage.js"


const app = express();
const port = 3000;

app.use(logger)
app.use(cors());
app.use(express.json());

app.get("/", homepage)
app.use("/receitas", receitaRouter);
app.use("/despesas", despesaRouter);
app.use("/users", userRouter);
app.use("/conta", contaRouter);
app.use("/cartao", cartaoCreditoRouter);
app.use("/categorias", categoriasRouter);
app.use("/exportar", pdfRouter);

app.use(notFoundController)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
