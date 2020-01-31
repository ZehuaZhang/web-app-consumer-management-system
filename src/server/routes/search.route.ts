import { Router } from 'express'
import { SearchController } from "../controllers/search.controller"

const router = Router()
const controller = new SearchController()

router.get(`/`, controller.searchUsers)

export default router