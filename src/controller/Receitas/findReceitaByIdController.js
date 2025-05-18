import { findById } from "../../models/receitaModel.js"

export async function findReceitaByIdController(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const result = await findById(id)
    if (!result) {
      return res.status(404).json({ message: 'Receita não encontrada' })
    }
    return res.json(result)
  } catch (error) {
    next(error)
  }
}
