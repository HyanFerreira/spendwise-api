import { remove } from "../../models/receitaModel.js"

export async function removeReceitaController(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID inválido. Informe um ID numérico válido." })
    }

    const deleted = await remove(id); 
    
    if (!deleted) {
      return res.status(404).json({ message: `Receita com ID ${id} não encontrada.` })
    }

    return res.status(200).send().json({ message: "Receita deletada com sucesso!!"})
  } 
  catch (error) {
    
    console.error(error)

    return res.status(500).json({
      message: "Erro ao tentar deletar a receita. Tente novamente mais tarde ou verifique as informações passadas!",
      error: error.message || error,
    });
  }
}
