import { findById } from "../../models/userModel.js";

export async function findUserByIdController(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const user = await findById(id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar usuário", detail: err.message });
  }
}
