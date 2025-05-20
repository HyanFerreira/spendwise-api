import { update } from "../../models/receitaModel.js"
import { receitaValidator } from "../../models/receitaModel.js"

export async function updateReceitaController(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const { success, error, data: receitaValidated } = receitaValidator(req.body, true)
    if (!success) {
      return res.status(400).json({
        message: 'Erro ao atualizar receita, verifique os dados!',
        errors: error.flatten().fieldErrors
      })
    }

    const result = await update(id, receitaValidated)
    return res.json({
      message: 'Receita atualizada com sucesso!',
      receita: result
    })
  } catch (error) {
    next(error)
  }
}