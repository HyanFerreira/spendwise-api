import { findReceitaByIdController } from '../controller/Receitas/findReceitaByIdController.js'
import * as receitaModel from '../models/receitaModel.js'

test('findReceitaByIdController - retorna receita existente', async () => {
  const req = { params: { id: '1' } }
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
  const next = jest.fn()

  jest.spyOn(receitaModel, 'findById').mockResolvedValue({ id: 1, nome: 'Receita Teste' })

  await findReceitaByIdController(req, res, next)

  expect(receitaModel.findById).toHaveBeenCalledWith(1)
  expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Receita Teste' })
  expect(res.status).not.toHaveBeenCalledWith(404)
  expect(next).not.toHaveBeenCalled()
})

test('findReceitaByIdController - receita não encontrada', async () => {
  const req = { params: { id: '999' } }
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
  const next = jest.fn()

  jest.spyOn(receitaModel, 'findById').mockResolvedValue(null)

  await findReceitaByIdController(req, res, next)

  expect(receitaModel.findById).toHaveBeenCalledWith(999)
  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.json).toHaveBeenCalledWith({ message: 'Receita não encontrada' })
  expect(next).not.toHaveBeenCalled()
})

test('findReceitaByIdController - erro inesperado', async () => {
  const req = { params: { id: '1' } }
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
  const next = jest.fn()

  const error = new Error('Erro no banco de dados')
  jest.spyOn(receitaModel, 'findById').mockRejectedValue(error)

  await findReceitaByIdController(req, res, next)

  expect(receitaModel.findById).toHaveBeenCalledWith(1)
  expect(next).toHaveBeenCalledWith(error)
})
