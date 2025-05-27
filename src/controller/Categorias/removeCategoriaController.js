
import { remove } from "../../models/categoriaModel.js";

export async function removeCategoriaController(req, res) {
  const id = parseInt(req.params.id);

  try {
    await remove(id);
    return res.status(204).send(); // Sem conteúdo
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao deletar categoria!", details: error.message });
  }
};