import { findAll } from "../../models/receitaModel.js"

export async function findAllReceitasController(req, res, next) {
    try {
        const result = await findAll()
        return res.json(result)
    } catch (error) {
        next(error)
    }
}
