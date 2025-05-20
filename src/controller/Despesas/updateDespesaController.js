import { update, despesaValidator } from "../../models/despesaModel.js"

export async function updateDespesaController(req, res, next) {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido." })
        }

        const { success, error, data: despesaValidated } = despesaValidator(req.body)
        if (!success) {
        return res.status(400).json({
            message: 'Erro ao atualizar despesa, verifique os dados!',
            errors: error.flatten().fieldErrors
        })
        }

        const updated = await update(id, despesaValidated)
        if (!updated) {
        return res.status(404).json({ message: `Despesa com ID ${id} não encontrada.` })
        }

        return res.status(200).json({
        message: "Despesa atualizada com sucesso!",
        despesa: updated
        })
    } catch (error) {
        next(error)
    }
}