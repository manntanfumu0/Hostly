import { Request, Response } from 'express'

import { ProjectsService } from '../services/projects.service'

const projectsService = new ProjectsService()

export class ProjectsController {
  async getAll(request: Request, response: Response) {
    const projects = await projectsService.getAll()

    return response.json(projects)
  }

  async create(request: Request, response: Response) {
    const { name, description, framework } = request.body

    const project = await projectsService.create({
      name,
      description,
      framework
    })

    return response.status(201).json(project)
  }
}