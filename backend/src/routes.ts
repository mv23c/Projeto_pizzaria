import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'

const router = Router()

// -- Rotas User --
router.post('/users', new CreateUserController().handle)
// Instanciação do objeto do tipo CreateUserController para chamar o método handle.

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- Rotas Category --
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
export { router }