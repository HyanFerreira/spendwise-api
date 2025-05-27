import express from "express";
import { createCategoriaController } from "../controller/Categorias/createCategoriaController.js";
import { findAllCategoriasController } from "../controller/Categorias/findAllCategoriasController.js";
import { findCategoriaByIdController } from "../controller/Categorias/findCategoriaByIdController.js";
import { updateCategoriaController } from "../controller/Categorias/updateCategoriaController.js";
import { removeCategoriaController } from "../controller/Categorias/removeCategoriaController.js";

const router = express.Router();

router.get("/",  findAllCategoriasController );
router.get("/find/:id", findCategoriaByIdController);
router.post("/create", createCategoriaController);
router.put("/update/:id", updateCategoriaController);
router.delete("/delete/:id", removeCategoriaController);

export default router;