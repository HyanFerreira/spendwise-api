import express from "express";
import { exportPdf } from "../controller/GeradorPdf/pdfGeneratorController";
import { authenticateToken } from "../controller/Users/loginUserController";

const router = express.Router();

router.get("/exportar-pdf", authenticateToken, exportPdf);

export default router;