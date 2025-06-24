import { findByUserId } from "../../models/categoriaModel.js";

export async function findCategoriaByIdUserController(req, res) {
  const { id } = req.params;

  try {
    const categorias = await findByUserId(Number(id));
    res.status(200).json(categorias);
  } catch (error) {
    console.error("Erro ao buscar categorias do usuário:", error);
    res.status(500).json({ message: "Erro ao buscar categorias do usuário." });
  }
}
