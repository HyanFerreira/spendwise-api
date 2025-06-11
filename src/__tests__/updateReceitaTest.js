import { updateReceitaController } from '../controller/Receitas/updateReceitaController.js'
import * as receitaModel from '../models/receitaModel.js'

describe('updateReceitaController', () => {
  const req = {
    params: { id: '1' },
    body: { nome: 'Receita Atualizada' }
  }

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }

  const next = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('atualiza receita com sucesso', async () => {
    jest.spyOn(receitaModel, 'receitaValidator').mockReturnValue({
      success: true,
      error: null,
      data: req.body
    })

    jest.spyOn(receitaModel, 'update').mockResolvedValue({ id: 1, nome: 'Receita Atualizada' })

    await updateReceitaController(req, res, next)

    expect(receitaModel.receitaValidator).toHaveBeenCalledWith(req.body, true)
    expect(receitaModel.update).toHaveBeenCalledWith(1, req.body)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Receita atualizada com sucesso!',
      receita: { id: 1, nome: 'Receita Atualizada' }
    })
    expect(next).not.toHaveBeenCalled()
  })

  test('retorna erro de validação', async () => {
    jest.spyOn(receitaModel, 'receitaValidator').mockReturnValue({
      success: false,
      error: {
        flatten: () => ({
          fieldErrors: { nome: ['Nome inválido'] }
        })
      },
      data: null
    })

    await updateReceitaController(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Erro ao atualizar receita, verifique os dados!',
      errors: { nome: ['Nome inválido'] }
    })
    expect(receitaModel.update).not.toHaveBeenCalled()
  })

  test('trata erro interno com next()', async () => {
    const erroSimulado = new Error('Erro no banco de dados')
    jest.spyOn(receitaModel, 'receitaValidator').mockReturnValue({
      success: true,
      error: null,
      data: req.body
    })
    jest.spyOn(receitaModel, 'update').mockRejectedValue(erroSimulado)

    await updateReceitaController(req, res, next)

    expect(next).toHaveBeenCalledWith(erroSimulado)
  })
})
