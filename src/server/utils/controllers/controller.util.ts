/**
 * Utility & Helper Functions for General Controllers
 */

import { inspect } from 'util'
import { Response } from 'express'
import { isArray, isString } from '../object.util'
import { ResponseError } from 'server/interfaces/controller.interface'

export function respondOnSuccess(status: number, data: any, res: Response) {
  res.status(status).send(data)
}

export function respondOnError(status: number, error: any, res: Response) {
  status = status || getStatusFromError(error)
  const response = getErrorResponseFromError(error)

  res.status(status).send(response)
}

function getStatusFromError(error: any): number {
  let status = 500

  if (isArray(error)) {
    status = error[0] && (error[0].status || error[0].code) || status
  } else if (error && (error.status || error.code)) {
    status = error.status || error.code
  }

  return status
}

function getErrorResponseFromError(error: any) {
  const detailError = error.errors || error || null
  const response: ResponseError = {
    message: error.message || 'Unknown Error',
    stack: isString(error) ? error : inspect(detailError),
    error: detailError
  }

  return response
}