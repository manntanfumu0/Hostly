import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Sidebar } from '../../components/sidebar'
import { ProjectList } from '../../components/project-list'
import { CreateProjectModal } from '../../components/create-project-modal'
import { useProjects } from '../../hooks/useProjects'

export function Dashboard() {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const { data, isLoading } = useProjects()
  
  useEffect(() => {
    const token = localStorage.getItem('@hostly:token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <header className="border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-white text-black px-4 py-2 text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors"
            >
              Novo Projeto
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Seus Projetos
          </h2>

          {/* 💻 Aqui renderiza APENAS a lista de projetos ativos */}
          {isLoading ? (
            <p className="text-zinc-400 text-sm">Carregando projetos...</p>
          ) : (
            <ProjectList projects={data || []} />
          )}
        </main>
      </div>

      {openModal && <CreateProjectModal onClose={() => setOpenModal(false)} />}
    </div>
  )
}