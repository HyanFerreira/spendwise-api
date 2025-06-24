import express from "express";
import { createDespesaController } from "../controller/Despesas/createDespesaController.js";
import { findAllDespesaController } from "../controller/Despesas/findAllDespesaController.js";
import { findDespesaByIdController } from "../controller/Despesas/findDespesaByIdController.js";
import { updateDespesaController } from "../controller/Despesas/updateDespesaController.js";
import { removeDespesaController } from "../controller/Despesas/removeDespesaValidator.js";
import { findDespesasByUserIdController } from "../controller/Despesas/findDespesasByUserIdController.js";

const router = express.Router();

router.get("/", findAllDespesaController);
router.get("/find/:id", findDespesaByIdController);
router.get("/user/:userId", findDespesasByUserIdController);
router.post("/create", createDespesaController);
router.put("/update/:id", updateDespesaController);
router.delete("/delete/:id", removeDespesaController);

export default router;
