/**
 * Routes Initialize
 * 
 * All most high level routes define here, it also catch all for internal server error, and resource not found
 */

import { Application } from 'express'

import home from '../routes/index.route'
import user from '../routes/user.route'
import search from '../routes/search.route'
import resourceNotFound from '../middlewares/resourseNotFound.middleware'
import customError from '../middlewares/customError.middleware'
import internalServerError from '../middlewares/internalServerError.middleware'
import crossResourceSharing from '../middlewares/crossResourceSharing.middleware'

export default function initializeRoutes() {
  return (app: Application) => {
    app.use(crossResourceSharing)

    app.use('/', home)

    app.use('/api/users/', user)
    app.use('/api/accounts/', user)

    app.use('/api/search/', search)

    app.use(customError)
    app.use(internalServerError)
    app.use(resourceNotFound)

    console.log('routes initialized')
  }
}
