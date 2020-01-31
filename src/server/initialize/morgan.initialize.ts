/**
 * Morgan Initialize
 * 
 * This middlware is to format the console log for http requests
 */

import * as morgan from 'morgan'
import { Application } from 'express'

export default function initializeMorgan(format: string) {
  return (app: Application) => {
    app.use(morgan(format))
    console.log('morgan initialized')
  }
}
