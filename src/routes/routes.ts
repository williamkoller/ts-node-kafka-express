import HealthController from '@/controllers/health/health.controller'
import UserController from '@/controllers/user/user.controller'
import { Router } from 'express'

const router: Router = Router()
const healthController = new HealthController()
const userController = new UserController()

router.get('/health', healthController.health)
router.post('/users', userController.create)

export { router }
