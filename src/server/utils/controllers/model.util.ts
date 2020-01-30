/**
 * Utility & Helper Functions for General Model Controller
 */

import { Request, Response } from 'express'

import { respondOnSuccessWithJsonApi } from './controller.util'

export function respondWithSuccess(response: any, req: Request, res: Response) {
  const status = response.status || 200
  const data = response.body

  respondOnSuccessWithJsonApi(status, data, req, res)
}
