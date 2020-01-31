/**
 * Json Body Parsing Enable Initialize
 * 
 * This middleware enables json body parsing in http request 
 */

import { Application, urlencoded } from 'express'

export default function initializeJsonParsingInHttpBody(method: any) {
  return (app: Application) => {
    app.use(method)
    app.use(urlencoded({ extended: true }))
    console.log('json body parsing initialized')
  }
}
