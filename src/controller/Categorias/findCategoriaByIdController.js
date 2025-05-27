
import { findById } from "../../models/categoriaModel.js";

export async function findCategoriaByIdController(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const result = await findById(id)
    if (!result) {
      return res.status(404).json({ message: 'Categoria não encontrada não encontrado' })
    }
    return res.json(result)
  } catch (error) {
    next(error)
  }
};