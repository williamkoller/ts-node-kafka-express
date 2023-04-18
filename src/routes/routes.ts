import HealthController from '@/controllers/health/health.controller'
import { Router } from 'express'

const router: Router = Router()
const healthController = new HealthController()

router.get('/health', healthController.health)

export { router }
