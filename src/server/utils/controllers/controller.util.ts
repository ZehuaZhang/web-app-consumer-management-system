/**
 * Utility & Helper Functions for General Controllers
 */

import { inspect } from 'util'
import { Response } from 'express'
import { isArray, isString } from '../object.util'

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
  const response = {
    error: 'Unknown Error'
  }

  if (error && error.errors) {
    response.error = error.errors
  } else if (isString(error)) {
    response.error = error
  } else {
    response.error = inspect(error)
  }

  return response
}