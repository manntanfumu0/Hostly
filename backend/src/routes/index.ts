import { Router } from 'express'

import { authRoutes } from './auth.routes'
import { projectsRoutes } from './projects.routes'

const routes = Router()

routes.use('/auth', authRoutes)

routes.use('/projects', projectsRoutes)

export { routes }
