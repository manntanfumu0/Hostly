import { Router } from 'express'

import { ProjectsController } from '../controllers/projects.controller'

const projectsRoutes = Router()

const projectsController = new ProjectsController()

projectsRoutes.get('/', projectsController.getAll)

projectsRoutes.post('/', projectsController.create)

export { projectsRoutes }