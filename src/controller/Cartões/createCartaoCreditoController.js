import { create, cartaoValidator} from "../../models/cartaoCreditoModel.js";


export async function createReceitaController(req, res, next) {
  try {
    const { success, error, data: cartaoValidated } = cartaoValidator(req.body)
    if (!success) {
      return res.status(400).json({
        message: 'Erro ao cadastrar cartão de crédito, verifique os dados!',
        errors: error.flatten().fieldErrors
      })
    }

    const result = await create(cartaoValidated)
    return res.status(201).json({
      message: 'Cartão de Crédito criado com sucesso!',
      receita: result
    })
  } catch (error) {
    next(error)
  }
};
