import { findCartoesByUserId } from "../../models/cartaoCreditoModel.js";

export async function findCartoesByUserIdController(req, res) {
  const { userId } = req.params;

  try {
    const cartoes = await findCartoesByUserId(Number(userId));
    return res.status(200).json(cartoes);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar cartões", detail: err.message });
  }
}
