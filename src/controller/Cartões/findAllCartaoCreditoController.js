import { findAll } from "../../models/cartaoCreditoModel.js";

export async function findAllCartaoCreditoController(req, res, next) {
    try {
        const result = await findAll()
        return res.json(result)
    } catch (error) {
        next(error)
    }
};
