import { remove } from "../../models/despesaModel.js"

export async function removeDespesaController(req, res, next) {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido." })
        }

        const removed = await remove(id)
        if (!removed) {
        return res.status(404).json({ message: `Despesa com ID ${id} não encontrada.` })
        }

        return res.status(204).send().json({ message: "Despesa deletada com sucesso!!"})
    } 
    catch (error) {
        next(error)
    }
}
