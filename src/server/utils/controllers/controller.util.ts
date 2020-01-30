/**
 * Utility & Helper Functions for General Controllers
 */

import { inspect } from 'util'

import { I_HeaderOptions, I_ErrorResponse, I_ErrorResponseData } from '../../interfaces/controllers/controller.interface'
import { Request, Response } from 'express'

import { HttpHeader } from '../constants.util'
import { isArray, isString } from '../object.util'

export function respondOnSuccess(status: number, data: any, req: Request, res: Response) {
  res
    .set(HttpHeader.contentType.name, req.get(HttpHeader.accept.name))
    .status(status).send(data)
}

export function respondOnSuccessWithJsonApi(status: number, data: any, req: Request, res: Response) {
  const options = getResponseHeaderOptionsForJsonApi()
  respondOnSuccessWithHeaders(status, data, options, req, res)
}

export function respondOnError(error: any, req: Request, res: Response) {
  const status = getStatusFromError(error)
  const response = getErrorResponseFromError(error)

  res
    .set(HttpHeader.contentType.name, req.get(HttpHeader.accept.name))
    .status(status).send(response)
}

export function respondOnErrorWithJsonApi(error: any, req: Request, res: Response) {
  const options = getResponseHeaderOptionsForJsonApi()
  respondOnErrorWithHeaders(error, options, req, res)
}

export function respondOnSuccessWithHeaders(status: number, data: any, options: I_HeaderOptions, req: Request, res: Response) {
  res.set(HttpHeader.contentType.name, req.get(HttpHeader.accept.name))
  setResponseHeaders(options, res)
  res.status(status).send(data)
}

export function respondOnErrorWithHeaders(error: any, options: I_HeaderOptions, req: Request, res: Response) {
  const status = getStatusFromError(error)
  const response = getErrorResponseFromError(error)

  res.set(HttpHeader.contentType.name, req.get(HttpHeader.accept.name))
  setResponseHeaders(options, res)
  res.status(status).send(response)
}

function getStatusFromError(error: any): number {
  let status = 500

  if (isArray(error)) {
    status = error[0] && error[0].status || status
  } else if (error && error.status) {
    status = error.status
  }

  return status
}

function getErrorResponseFromError(error: any): I_ErrorResponse {
  const status = getStatusFromError(error)

  let response: I_ErrorResponse = {
    status: status,
    errors: []
  }

  if (error && error.errors) {
    response = error as I_ErrorResponse
  } else {
    if (isString(error)) {
      response.errors.push({
        detail: error
      })
    } else {
      response.errors.push({
        ...error,
        detail: inspect(error)
      })
    }
  }

  return response
}

function setResponseHeaders(options: I_HeaderOptions, res: Response) {
  for (let headerName in options) {
    const headerValue = options[headerName]
    res.set(headerName, headerValue)
  }
}

function getResponseHeaderOptionsForJsonApi(): I_HeaderOptions {
  return {
    [HttpHeader.contentType.name]: HttpHeader.contentType.value.jsonApi
  }
}
