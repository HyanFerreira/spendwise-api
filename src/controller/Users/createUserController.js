import { create } from "../../models/userModel.js";
import { userValidator } from "../../models/userModel.js";

export async function createUserController(req, res) {
  const validation = userValidator(req.body);

  if (!validation.success) {
    return res.status(400).json(validation.error.format());
  }

  try {
    const user = await create(validation.data);
    return res.status(201).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao criar usuário", detail: err.message });
  }
}
