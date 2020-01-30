/**
 * Internal Server Error Middlware
 * 
 * This middleware is to catch all unknown errors in the code
 */
import { inspect } from 'util'

import { Request, Response } from 'express'

import { respondOnErrorWithJsonApi } from '../utils/controllers/controller.util'

export default function(error: any, req: Request, res: Response, next: any) {
  console.log('Internal Server Error captured: ', error)

  const error500 = {
    errors: [
      {
        message: 'internal server error occured',
        detail: inspect(error)
      }
    ]
  }

  return respondOnErrorWithJsonApi(error500, req, res)
}
