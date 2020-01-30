/**
 * Middleware and Routes Initialize
 * 
 * it will add as a high order function which applies incoming functions, i.e. middlewares and routes
 */

import { Application } from 'express'
import { I_MiddlewareHandle } from '../interfaces/initialize/initialize.interface'

import initializeMiddlewaresWithBugsnag from './bugsnag.initialize'

export default function initializeMiddlewaresAndRoutes(app: Application, ...middlewares: I_MiddlewareHandle[]): void {
  console.log('Initializing middleware and routes ...')
  console.group()
  initializeMiddlewaresWithBugsnag(app, ...middlewares)
  console.groupEnd()
  console.log('Initializing middleware and routes ... Done\n')
}
