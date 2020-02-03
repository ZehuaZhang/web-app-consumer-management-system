/**
 * Cross Resource Sharing Middleware
 * 
 * This middleware is to allow restricted resources to be requested from another domain.
 */

import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')

  next()
}

