import { findById } from "../../models/despesaModel.js"

export async function findDespesaByIdController(req, res, next) {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido." })
        }

        const despesa = await findById(id)
        if (!despesa) {
        return res.status(404).json({ message: `Despesa com ID ${id} não encontrada.` })
        }

        return res.status(200).json(despesa)
    } catch (error) {
        next(error)
    }
}