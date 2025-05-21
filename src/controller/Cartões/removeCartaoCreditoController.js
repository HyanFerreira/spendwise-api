
import { remove } from "../../models/cartaoCreditoModel.js";

export async function removeCartaoCreditoController(req, res) {
  const id = parseInt(req.params.id);

  try {
    await remove(id);
    return res.status(204).send(); // Sem conteúdo
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao deletar cartão de crédito", details: error.message });
  }
};