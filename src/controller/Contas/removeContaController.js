import { remove } from "../../models/contaModel.js";

export async function removeContaController(req, res) {
  const id = parseInt(req.params.id);

  try {
    await remove(id);
    return res.status(204).send(); // Sem conteúdo
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao deletar conta", details: error.message });
  }
}
