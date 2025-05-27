import { findById } from "../../models/contaModel.js";

export async function findContaByIdController(req, res) {
  const id = parseInt(req.params.id);

  try {
    const conta = await findById(id);
    if (!conta) {
      return res.status(404).json({ error: "Conta não encontrada" });
    }
    return res.status(200).json(conta);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar conta", details: error.message });
  }
}
