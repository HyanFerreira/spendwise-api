import { create, categoriaValidator} from "../../models/categoriaModel.js";


export async function createCategoriaController(req, res, next) {
  try {
    const { success, error, data: categoriaValidated } = categoriaValidator(req.body)
    if (!success) {
      return res.status(400).json({
        message: 'Erro ao criar categoria, verifique as informações preenchidas!',
        errors: error.flatten().fieldErrors
      })
    }

    const result = await create(categoriaValidated)
    return res.status(201).json({
      message: 'Categoria criada com sucesso!',
      categoria: result
    })
  } catch (error) {
    next(error)
  }
};
