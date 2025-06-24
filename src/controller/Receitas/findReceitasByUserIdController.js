import { findReceitasByUserId } from "../../models/receitaModel.js";

export async function findReceitasByUserIdController(req, res) {
  const { userId } = req.params;

  try {
    const receitas = await findReceitasByUserId(Number(userId));
    return res.status(200).json(receitas);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar receitas", detail: err.message });
  }
}
