/**
 * Internal Server Error Middlware
 * 
 * This middleware is to catch all unknown errors in the code
 */

import { inspect } from 'util'
import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'
import { respondOnError } from 'server/utils/controllers/controller.util'

export default function (error: any, req: Request, res: Response, next: any) {
  console.log('Internal Server Error captured: ', error)

  const error500 = {
    error: {
      message: 'internal server error occured',
      detail: inspect(error)
    }
  }

  return respondOnError(INTERNAL_SERVER_ERROR, error500, res)
}
