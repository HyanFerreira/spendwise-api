import { contaValidator, update } from "../../models/contaModel.js";

export async function updateContaController(req, res) {
  const id = parseInt(req.params.id);
  const validated = contaValidator(req.body, true);

  if (!validated.success) {
    return res.status(400).json({ error: validated.error.errors });
  }

  try {
    const updatedConta = await update(id, validated.data);
    return res.status(200).json(updatedConta);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao atualizar conta", details: error.message });
  }
}
