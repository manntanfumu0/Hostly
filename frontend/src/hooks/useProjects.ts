import { useQuery } from '@tanstack/react-query'

import { api } from '../services/api'
import type { Project } from '../types/project'

async function fetchProjects(): Promise<Project[]> {
  const response = await api.get('/projects')

  return response.data
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects
  })
}