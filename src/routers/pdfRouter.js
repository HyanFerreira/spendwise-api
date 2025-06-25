import express from "express";
import { exportPdf } from "../controller/GeradorPdf/pdfGeneratorController.js";
import { loginUserController } from "../controller/Users/loginUserController.js";

const router = express.Router();

router.get("/exportar-pdf", exportPdf);

export default router;
