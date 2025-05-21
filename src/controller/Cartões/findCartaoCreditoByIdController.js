
import { findById } from "../../models/cartaoCreditoModel.js";

export async function findCartaoCreditoByIdController(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const result = await findById(id)
    if (!result) {
      return res.status(404).json({ message: 'Cartão de Crédito não encontrado' })
    }
    return res.json(result)
  } catch (error) {
    next(error)
  }
};