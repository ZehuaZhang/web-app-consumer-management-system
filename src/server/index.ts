import * as express from 'express'
import { DefaultDBPath } from 'server/utils/constants'
import applyMiddlewareAndRoute from 'server/initialize/middlewares.initialize'
import initializeRoutes from 'server/initialize/routes.initialize'
import enableRequestLoggingWithFormat from 'server/initialize/morgan.initialize'
import enableJsonParsingInHttpBody from 'server/initialize/json.initialize'

export function app() {
  const app = express()

  applyMiddlewareAndRoute(app,
    enableJsonParsingInHttpBody(express.json()),
    enableRequestLoggingWithFormat('tiny'),
    initializeRoutes()
  )

  console.log('Initializing Porta server ...')
  console.group()
  const port = process.env.PORT || 4000

  const server = app.listen(port, () => {
    console.groupEnd()
    console.log(`Porta listening on port ${port}\n`)
  })

  return {
    app,
    server
  }
}