import express from 'express'

import applyMiddlewareAndRoute from './initialize/middlewares.initialize'
import initializeRoutes from './initialize/routes.initialize'
import enableRequestLoggingWithFormat from './initialize/morgan.initialize'
import enableJsonParsingInHttpBody from './initialize/json.initialize'

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
const port = process.env.PORT || 4000

const server = app.listen(port, () => {
  console.groupEnd()
  console.log(`Porta listening on port ${port}\n`)
})

export default server
