import { useQuery } from '@tanstack/react-query'

import type { Project } from '../types/project'

async function fetchProjects(): Promise<Project[]> {
  return [
    {
      id: '1',
      name: 'Hostly Website',
      description: 'Site principal da Hostly',
      framework: 'React',
      visibility: 'public', // Adicionado para bater com o tipo Project
      status: 'Online',
      slug: 'hostly-website',
      createdAt: new Date().toISOString()
    },

    {
      id: '2',
      name: 'Dashboard Admin',
      description: 'Painel administrativo',
      framework: 'Next.js',
      visibility: 'private', // Adicionado para bater com o tipo Project
      status: 'Deploying',
      slug: 'dashboard-admin',
      createdAt: new Date().toISOString()
    },

    {
      id: '3',
      name: 'API Backend',
      description: 'Servidor principal',
      framework: 'Node.js',
      visibility: 'private', // Adicionado para bater com o tipo Project
      status: 'Online',
      slug: 'api-backend',
      createdAt: new Date().toISOString()
    }
  ]
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects
  })
}
