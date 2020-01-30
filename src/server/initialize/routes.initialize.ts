/**
 * Routes Initialize
 * 
 * All most high level routes define here, it also catch all for internal server error, and resource not found
 */

import { Application } from 'express'

import home from '../routes/index.route'
import metrics from '../routes/metrics.route'
import catalogue from '../routes/catalogue.route'
import csm from '../routes/csm.route'
import ogt from '../routes/ogt.route'
import ogs from '../routes/ogs.route'
import oldp from '../routes/oldp.route'
import hlms from '../routes/hlms.route'
import sldp from '../routes/sldp.route'
import cldp from '../routes/cldp.route'
import buffer from '../routes/user.route'
import sldpcat from '../routes/sldp-cat.route'
import docs from '../routes/docs.route'
import resourceNotFound from '../middlewares/resourseNotFound.middleware'
import customError from '../middlewares/customError.middleware'
import internalServerError from '../middlewares/internalServerError.middleware'
import unauthorizedUserError from '../middlewares/unauthorizedUserError.middleware'
import crossResourceSharing from '../middlewares/crossResourceSharing.middleware'

export default function initializeRoutes() {
  return (app: Application) => {
    app.use(crossResourceSharing)

    app.use('/', home)
    app.use('/api/', home)
    app.use('/docs/', docs)
    app.use('/api/metrics/', metrics)
    app.use('/api/models/', catalogue)
    app.use('/api/csm/', csm)
    app.use('/api/ogt/', ogt)
    app.use('/api/ogs/', ogs)
    app.use('/api/oldp/', oldp)
    app.use('/api/hlms/', hlms)
    app.use('/api/sldp/', sldp)
    app.use('/api/cldp/', cldp)
    app.use('/api/buffer/', buffer)
    app.use('/api/sldp-cat/', sldpcat)

    app.use(unauthorizedUserError)
    app.use(customError)
    app.use(internalServerError)
    app.use(resourceNotFound)

    console.log('routes initialized')
  }
}
