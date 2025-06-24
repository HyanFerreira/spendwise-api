import { findContaByUserId } from "../../models/contaModel.js";
import { findDespesasByUserId } from "../../models/despesaModel.js";
import { findReceitasByUserId } from "../../models/receitaModel.js";

export async function getContaResumo(req, res) {
  const { userId } = req.params;

  try {
    const conta = await findContaByUserId(Number(userId));
    if (!conta) {
      return res.status(404).json({ error: "Conta não encontrada" });
    }

    // Buscar despesas e receitas do usuário
    const despesas = await findDespesasByUserId(Number(userId));
    const receitas = await findReceitasByUserId(Number(userId));

    // Somar valores
    const totalDespesas = despesas.reduce(
      (acc, desp) => acc + desp.valor_despesa,
      0
    );
    const totalReceitas = receitas.reduce(
      (acc, rec) => acc + rec.valor_receita,
      0
    );

    // Calcular saldo atual e saldo previsto
    const saldoAtual = conta.saldo_inicial || 0; // ou algum campo que represente o saldo na conta
    const saldoPrevisto = saldoAtual + totalReceitas - totalDespesas;

    return res.json({
      id: conta.id,
      nome: conta.nome,
      saldoInicial: conta.saldo,
      saldoAtual,
      totalReceitas,
      totalDespesas,
      saldoPrevisto
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar resumo da conta", detail: error.message });
  }
}
