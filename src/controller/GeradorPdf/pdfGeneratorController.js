
import { exportUserFinancialReport } from "../../util/pdfService.js"
import prisma from "@prisma/client";

export async function exportPdf(req, res) {
  try {
    const userId = req.user.id;

    const user = await prisma.users.findUnique({ where: { id: userId } });

    const contas = await prisma.conta.findMany({
      where: { id_user: userId },
      include: {
        receitas: true,
        despesas: { where: { id_cartao: null } },
      },
    });

    const cartoes = await prisma.cartao_credito.findMany({
      where: { id_user: userId },
      include: {
        despesas: true,
      },
    });

    const pdfBuffer = await exportUserFinancialReport(user, contas, cartoes);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="relatorio-financeiro.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    res.status(500).json({ error: 'Erro ao gerar PDF' });
  }
}
