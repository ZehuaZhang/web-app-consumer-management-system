import { Router, Request, Response } from 'express'

const router = Router()

// define the home page route
router.get('/', (req: Request, res: Response) => {
  res.send(`Welcome to .zZehua's Epic Server!`)
})

// Manual heartbeat
router.get('/ping', (req: Request, res: Response) => {
  res.send('pong')
})

export default router
