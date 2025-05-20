import { findAll } from "../../models/despesaModel.js"

export async function findAllDespesaController(req, res, next) {
  try {
    const despesas = await findAll()
    return res.status(200).json(despesas)
  } 
  catch (error) {
    next(error)
  }
}
