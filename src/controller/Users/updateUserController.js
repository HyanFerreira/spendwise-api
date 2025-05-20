import { update, userValidator } from "../../models/userModel.js";

export async function updateUserController(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const validation = userValidator(req.body, true);

  if (!validation.success) {
    return res.status(400).json(validation.error.format());
  }

  try {
    const user = await update(id, validation.data);
    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao atualizar usuário", detail: err.message });
  }
}
