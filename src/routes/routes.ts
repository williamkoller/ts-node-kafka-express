import HealthController from '@/controllers/health/health.controller'
import LogController from '@/controllers/log/log.controller'
import UserController from '@/controllers/user/user.controller'
import { Router } from 'express'

const router: Router = Router()
const healthController = new HealthController()
const userController = new UserController()
const logController = new LogController()

router.get('/health', healthController.health)
router.post('/users', userController.create)
router.get('/logs', logController.find)

export { router }
