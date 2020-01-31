/**
 * Routes Initialize
 * 
 * All most high level routes define here, it also catch all for internal server error, and resource not found
 */

import { Application } from 'express'
import home from 'server/routes/index.route'
import user from 'server/routes/user.route'
import search from 'server/routes/search.route'
import resourceNotFound from 'server/middlewares/resourseNotFound.middleware'
import internalServerError from 'server/middlewares/internalServerError.middleware'
import crossResourceSharing from 'server/middlewares/crossResourceSharing.middleware'

export default function initializeRoutes() {
  return (app: Application) => {
    app.use(crossResourceSharing)

    app.use('/', home)
    app.use('/accounts', user)
    app.use('/api/users/', user)
    app.use('/api/search/', search)

    app.use(internalServerError)
    app.use(resourceNotFound)

    console.log('routes initialized')
  }
}
