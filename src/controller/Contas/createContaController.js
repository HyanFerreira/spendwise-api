import { contaValidator, create } from "../../models/contaModel.js";

export async function createContaController(req, res) {
  const validated = contaValidator(req.body);

  if (!validated.success) {
    return res.status(400).json({ error: validated.error.errors });
  }

  try {
    const conta = await create(validated.data);
    return res.status(201).json(conta);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao criar conta", details: error.message });
  }
}
