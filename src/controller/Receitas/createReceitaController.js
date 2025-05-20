import { create, receitaValidator} from "../../models/receitaModel.js"


export async function createReceitaController(req, res, next) {
  try {
    const { success, error, data: receitaValidated } = receitaValidator(req.body)
    if (!success) {
      return res.status(400).json({
        message: 'Erro ao cadastrar receita, verifique os dados!',
        errors: error.flatten().fieldErrors
      })
    }

    const result = await create(receitaValidated)
    return res.status(201).json({
      message: 'Receita criada com sucesso!',
      receita: result
    })
  } catch (error) {
    next(error)
  }
}




