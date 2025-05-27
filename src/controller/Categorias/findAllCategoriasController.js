import { findAll } from "../../models/categoriaModel.js";

export async function findAllCategoriasController(req, res, next) {
    try {
        const result = await findAll()
        return res.json(result)
    } catch (error) {
        next(error)
    }
};