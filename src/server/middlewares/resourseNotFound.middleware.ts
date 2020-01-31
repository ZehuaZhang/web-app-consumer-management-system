/**
 * Resource Not Found Middlware
 * 
 * This middleware is to catch all requests whose resources cannot be found
 */

import { Request, Response } from 'express'
import { NOT_FOUND } from 'http-status-codes'
import { respondOnError } from 'server/utils/controllers/controller.util'

export default function(req: Request, res: Response, next: any) {
  const error404 = {
    error: 'resource not found'
  }

  return respondOnError(NOT_FOUND, error404, res)
}
