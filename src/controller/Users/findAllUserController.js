import { findAll } from "../../models/userModel.js";

export async function findAllUsersController(req, res) {
  try {
    const users = await findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar usuários", detail: err.message });
  }
}
