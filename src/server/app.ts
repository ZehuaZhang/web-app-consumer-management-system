#!/usr/bin/env node

/**
 * Express App and Server Entry point
 */

import express from 'express'

import initializeEnvironment from './initialize/environment.initialize'
initializeEnvironment() // this should happen before requiring anything which uses process.env

import applyMiddlewareAndRoute from './initialize/middlewares.initialize'
import initializeRoutes from './initialize/routes.initialize'
import getLightshipWithPort from './initialize/lightship.initialize'
import enableRequestLoggingWithFormat from './initialize/morgan.initialize'
import enableJsonParsingInHttpBody from './initialize/json.initialize'

initializeEnvironment()

export const app = express()

applyMiddlewareAndRoute(app,

  // apply middlewares here
  enableJsonParsingInHttpBody(express.json({
    type:['application/json', 'application/vnd.api+json']
  })),
  enableRequestLoggingWithFormat('tiny'),

  // apply routes here
  initializeRoutes()
)

console.log('Initializing Porta server ...')
console.group()
const port = process.env.PORTA_HELM_SERVICE_PORT_HTTP || process.env.PORT || 80
const lightship = getLightshipWithPort(process.env.LIGHTSHIP_PORT)

const server = app.listen(port, () => {
  console.groupEnd()
  console.log('Initializing Porta server ... Done\n')
  lightship.signalReady()
  console.log(`Lightship ready on port ${process.env.LIGHTSHIP_PORT}`)
  console.log(`Porta listening on port ${port}\n`)
})

lightship.registerShutdownHandler(() => {
  server.close()
})

export default server
