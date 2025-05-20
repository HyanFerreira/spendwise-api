import express from 'express'
import {createReceitaController} from "../controller/Receitas/createReceitaController.js"
import {findAllReceitasController} from "../controller/Receitas/findAllReceitaController.js"
import {findReceitaByIdController} from "../controller/Receitas/findReceitaByIdController.js"
import {updateReceitaController} from "../controller/Receitas/updateReceitaController.js"
import {removeReceitaController} from "../controller/Receitas/removeReceitaController.js"

const router = express.Router()

router.get('/', findAllReceitasController)
router.get('/find/:id', findReceitaByIdController)
router.post('/create', createReceitaController)
router.put('/update/:id', updateReceitaController)
router.delete('/delete/:id', removeReceitaController)

export default router
