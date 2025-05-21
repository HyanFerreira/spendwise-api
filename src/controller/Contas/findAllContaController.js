import { findAll } from "../../models/contaModel.js";

export async function findAllContaController(req, res) {
  try {
    const contas = await findAll();
    return res.status(200).json(contas);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar contas", details: error.message });
  }
}
