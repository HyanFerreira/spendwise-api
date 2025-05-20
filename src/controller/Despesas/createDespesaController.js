import {create, despesaValidator} from "../../models/despesaModel.js"

export async function createDespesaController(req, res, next) {
  try {
    const { success, error, data: despesaValidated } = despesaValidator(req.body)
    if (!success) {
      return res.status(400).json({
        message: 'Erro ao cadastrar despesa, verifique os dados!',
        errors: error.flatten().fieldErrors
      })
    }

    const result = await create(despesaValidated)
    return res.status(201).json({
      message: 'Despesa criada com sucesso!',
      despesa: result
    })
  } catch (error) {
    next(error)
  }
}
