import { prisma } from '../database/prisma'

interface CreateProjectDTO {
  name: string
  description?: string
  framework: string
}

export class ProjectsService {
  async getAll() {
    return prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async create(data: CreateProjectDTO) {
    const slug = data.name
      .toLowerCase()
      .replace(/\s/g, '-')

    return prisma.project.create({
      data: {
        ...data,
        slug,
        status: 'Online'
      }
    })
  }
}