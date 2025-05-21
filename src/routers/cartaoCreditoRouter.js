import express from "express";
import { createCartaoCreditoController } from "../controller/Cartões/createCartaoCreditoController.js";
import { findAllCartaoCreditoController } from "../controller/Cartões/findAllCartaoCreditoController.js";
import { findCartaoCreditoByIdController } from "../controller/Cartões/findCartaoCreditoByIdController.js";
import { updateCartaoCreditoController } from "../controller/Cartões/updateCartaoCreditoController.js";
import { removeCartaoCreditoController } from "../controller/Cartões/removeCartaoCreditoController.js";

const router = express.Router();

router.get("/", findAllCartaoCreditoController);
router.get("/find/:id", findCartaoCreditoByIdController);
router.post("/create", createCartaoCreditoController);
router.put("/update/:id", updateCartaoCreditoController);
router.delete("/delete/:id", removeCartaoCreditoController);

export default router;