import { findDespesasByUserId } from "../../models/despesaModel.js";

export async function findDespesasByUserIdController(req, res) {
  const { userId } = req.params;

  try {
    const despesas = await findDespesasByUserId(Number(userId));
    return res.status(200).json(despesas);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar despesas", detail: err.message });
  }
}
