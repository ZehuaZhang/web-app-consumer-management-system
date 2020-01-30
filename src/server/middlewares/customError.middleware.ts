/**
 * Custom Error Class handler
 * 
 * This middleware is to catch errors thrown that were defined in error.util.ts
 */

import { Request, Response } from 'express'
import HTTP_STATUS from 'http-status-codes'
import { BadRequestError } from '../utils/error.util'
import { respondOnErrorWithJsonApi } from '../utils/controllers/controller.util'

export default function (error: any, req: Request, res: Response, next: any) {
  if (error instanceof BadRequestError) {
    const errorResponse = {
      status: HTTP_STATUS.BAD_REQUEST,
      errors: [
        {
          message: error.message || 'Bad Request'
        }
      ]
    }
    respondOnErrorWithJsonApi(errorResponse, req, res)
  } else {
    next(error)
  }
}
