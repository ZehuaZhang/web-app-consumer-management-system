import { Router, Request, Response } from 'express'

const router = Router()

// home page
router.get('/', (req: Request, res: Response) => {
  res.send(`Welcome to .zZehua's Epic Server!`)
})

// manual heartbeat
router.get('/ping', (req: Request, res: Response) => {
  res.send('pong')
})

export default router
