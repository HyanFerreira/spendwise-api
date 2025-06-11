import { removeReceitaController } from '../controller/Receitas/removeReceitaController.js'
import * as receitaModel from '../models/receitaModel.js'

describe('removeReceitaController', () => {
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() }
  const next = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deleta receita com sucesso', async () => {
    const req = { params: { id: '1' } }
    jest.spyOn(receitaModel, 'remove').mockResolvedValue(true)

    await removeReceitaController(req, res, next)

    expect(receitaModel.remove).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Receita deletada com sucesso!!' })
    expect(res.json).toHaveBeenCalledWith({ message: 'Receita deletada com sucesso!!' })
  })

  test('retorna erro 400 se ID for inválido', async () => {
    const req = { params: { id: 'abc' } }

    await removeReceitaController(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'ID inválido. Informe um ID numérico válido.' })
    expect(receitaModel.remove).not.toHaveBeenCalled()
  })

  test('retorna erro 404 se receita não encontrada', async () => {
    const req = { params: { id: '99' } }
    jest.spyOn(receitaModel, 'remove').mockResolvedValue(false)

    await removeReceitaController(req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Receita com ID 99 não encontrada.' })
  })

  test('erro interno - retorna 500', async () => {
    const req = { params: { id: '1' } }
    const error = new Error('Erro inesperado')
    jest.spyOn(receitaModel, 'remove').mockRejectedValue(error)

    await removeReceitaController(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Erro ao tentar deletar a receita. Tente novamente mais tarde ou verifique as informações passadas!',
      error: error.message,
    })
  })
})
