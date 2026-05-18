import { prisma } from '../database/prisma'

interface CreateProjectDTO {
  name: string
  framework: string
  description?: string
}

export class ProjectsService {

  async getAll() {
    return prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async getBySlug(slug: string) {
    return prisma.project.findUnique({
      where: {
        slug
      }
    })
  }

  async create({
    name,
    framework,
    description
  }: CreateProjectDTO) {

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')

    const project = await prisma.project.create({
      data: {
        name,
        framework,
        description,
        slug,
        deploy_status: 'deploying',
        domain: `hostly.app/${slug}`
      }
    })

    setTimeout(async () => {
      await prisma.project.update({
        where: {
          id: project.id
        },
        data: {
          deploy_status: 'online'
        }
      })

      console.log(`✅ Deploy completed: ${project.name}`)
    }, 5000)

    return project
  }
}