import express from "express";
import { createContaController } from "../controller/Contas/createContaController.js";
import { findAllContaController } from "../controller/Contas/findAllContaController.js";
import { findContaByIdController } from "../controller/Contas/findContaByIdController.js";
import { updateContaController } from "../controller/Contas/updateContaController.js";
import { removeContaController } from "../controller/Contas/removeContaController.js";

const router = express.Router();

router.get("/", findAllContaController);
router.get("/find/:id", findContaByIdController);
router.post("/create", createContaController);
router.put("/update/:id", updateContaController);
router.delete("/delete/:id", removeContaController);

export default router;
