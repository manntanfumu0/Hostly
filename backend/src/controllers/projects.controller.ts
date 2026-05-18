import { Request, Response } from 'express'
import { ProjectsService } from '../services/projects.service'

export interface CreateProjectDTO {
  name: string
  framework: string
  description: string
}

const projectsService = new ProjectsService()

export class ProjectsController {

  async getAll(request: Request, response: Response) {

    const projects = await projectsService.getAll()

    return response.json(projects)
  }

  async getBySlug(request: Request, response: Response) {

    const { slug } = request.params

    const project = await projectsService.getBySlug(slug)

    return response.json(project)
  }

  async create(request: Request, response: Response) {

    const { name, framework, description } =
      request.body as CreateProjectDTO

    const project = await projectsService.create({
      name,
      framework,
      description
    })

    return response.status(201).json(project)
  }
}