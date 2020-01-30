/**
 * Resource Not Found Middlware
 * 
 * This middleware is to catch all requests whose resources cannot be found
 */

import { inspect } from 'util'

import { Request, Response } from 'express'

import { respondOnErrorWithJsonApi } from '../utils/controllers/controller.util'

export default function(req: Request, res: Response, next: any) {
  const error404 = {
    status: 404,
    errors: [
      {
        message: 'resource not found',
        detail: 'resource not found'
      }
    ]
  }

  return respondOnErrorWithJsonApi(error404, req, res)
}
