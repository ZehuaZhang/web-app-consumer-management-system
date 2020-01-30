import Router from 'express'
import controller from "../controllers/user.controller"
import { Api } from '../utils/constants.util'
import { Authorization } from '../middlewares/authorization.middleware'

const router = Router()

router.get(`/${Api.version.v1}/`, Authorization.checkJwt, controller.getModel)

export default router
