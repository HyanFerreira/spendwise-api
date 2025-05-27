
import { update, categoriaValidator } from "../../models/categoriaModel.js";

export async function updateCategoriaController(req, res) {
  const id = parseInt(req.params.id);
  const validated = categoriaValidator(req.body, true);

  if (!validated.success) {
    return res.status(400).json({ error: validated.error.errors });
  }

  try {
    const updatedCategoria = await update(id, validated.data);
    return res.status(200).json(updatedCategoria);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao atualizar categoria", details: error.message });
  }
};