// src/controller/GeradorPdf/pdfGeneratorController.js
import { exportUserFinancialReport } from "../../util/pdfService.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function exportPdf(req, res) {
  try {
    // Pega o id do usuário da query string
    const userId = parseInt(req.query.userId);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido." });
    }

    const user = await prisma.users.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const contas = await prisma.conta.findMany({
      where: { id_user: userId },
      include: {
        receitas: true,
        despesas: { where: { id_cartao: null } }
      }
    });

    const cartoes = await prisma.cartao_credito.findMany({
      where: { id_user: userId },
      include: {
        despesas: true
      }
    });

    const pdfBuffer = await exportUserFinancialReport(user, contas, cartoes);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="relatorio-financeiro.pdf"'
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    res.status(500).json({ error: "Erro ao gerar PDF" });
  }
}
