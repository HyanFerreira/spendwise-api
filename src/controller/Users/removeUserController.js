import { remove } from "../../models/userModel.js";

export async function removeUserController(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const user = await remove(id);
    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao deletar usuário", detail: err.message });
  }
}
