import Router from 'express'
import controller from "../controllers/user.controller"
import { Api } from '../utils/constants.util'

const router = Router()

router.get(`/`, controller.getModel)

export default router
