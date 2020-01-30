import { Request, Response } from 'express'

import { respondOnSuccessWithJsonApi } from './controller.util'

export function respondWithSuccess(response: any, req: Request, res: Response) {
  const status = response.status || 200
  const data = response

  respondOnSuccessWithJsonApi(status, data, req, res)
}
