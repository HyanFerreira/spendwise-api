
import { update, cartaoValidator } from "../../models/cartaoCreditoModel.js";

export async function updateCartaoCreditoController(req, res) {
  const id = parseInt(req.params.id);
  const validated = cartaoValidator(req.body, true);

  if (!validated.success) {
    return res.status(400).json({ error: validated.error.errors });
  }

  try {
    const updatedCartao = await update(id, validated.data);
    return res.status(200).json(updatedCartao);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao atualizar cartão de crédito", details: error.message });
  }
};