import { Router } from 'express'
import { UserController } from "../controllers/user.controller"

const router = Router()
const controller = new UserController()

router.get(`/`, controller.getUsers)
router.post(`/`, controller.addUser)
router.post(`/:id`, controller.updateUser)
router.delete(`/:id`, controller.deleteUser)

export default router
