/**
 * Bugsnag Initialize
 * 
 * In order to log correctly and entirely for bugsnag, all of the middlewares and routes will be applied within the its initialization
 */

import bugsnag from '@bugsnag/js'
import bugsnagExpress from '@bugsnag/plugin-express'

import { Application } from 'express'
import { I_MiddlewareHandle } from '../interfaces/initialize/initialize.interface'

export default function initializeMiddlewaresWithBugsnag(app: Application, ...middlewaresAndRoutes: I_MiddlewareHandle[]): void {
  if (process.env.BUGSNAG_API_KEY) {
    
    require('pkginfo')(module, 'version', 'description', 'name')
    const pkg = module.exports

    const bugsnagClient = bugsnag({
      apiKey: process.env.BUGSNAG_API_KEY,
      appVersion: pkg.version,
      releaseStage: process.env.BUGSNAG_STAGE || "local",
    })
  
    bugsnagClient.use(bugsnagExpress)
    const bugsnagMiddleware = bugsnagClient.getPlugin('express')
  
    // This must be the first piece of middleware in the stack.
    // It can only capture errors in downstream middleware
    app.use(bugsnagMiddleware.requestHandler)
    console.log('bugsnag initialized')
  
    /* all other middleware and application routes go here, requried by bugsnag */
    initializeMiddlewaresAndRoutes(app, middlewaresAndRoutes)
  
    // This handles any errors that Express catches
    app.use(bugsnagMiddleware.errorHandler)

  } else {
    initializeMiddlewaresAndRoutes(app, middlewaresAndRoutes)
  }
}

// note: signature of handler (middleware / route): (middlewareInput) => (app) => void
// the reason of intermediate middlewareInput is to have app.ts to show clearly what customized input passed to each (middleware / route)
function initializeMiddlewaresAndRoutes(app: Application, middlewaresAndRoutes: I_MiddlewareHandle[]) {
  middlewaresAndRoutes.forEach(middlewareOrRoute => middlewareOrRoute(app))
}

