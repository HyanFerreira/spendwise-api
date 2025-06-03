import { createReceitaController } from '../controller/Receitas/createReceitaController.js'
import * as receitaModel from '../models/receitaModel.js'

test('createReceitaController - cria receita', async () => {
  const req = { body: { nome: 'Teste' } }
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
  const next = jest.fn()

  jest.spyOn(receitaModel, 'receitaValidator').mockReturnValue({ success: true, error: null, data: req.body })
  jest.spyOn(receitaModel, 'create').mockResolvedValue({ id: 1, nome: 'Teste' })

  await createReceitaController(req, res, next)

  expect(receitaModel.create).toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(201)
  expect(res.json).toHaveBeenCalled()
  expect(next).not.toHaveBeenCalled()
})
