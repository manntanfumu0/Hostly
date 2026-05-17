import { useState } from 'react'

import { ProjectList } from '../../components/project-list'
import { CreateProjectModal } from '../../components/create-project-modal'
import { useProjects } from '../../hooks/useProjects'

export function Dashboard() {
  const [openModal, setOpenModal] = useState(false)

  // Buscando os dados e o estado de carregamento do hook tipado
  const { data, isLoading } = useProjects()

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Hostly
          </h1>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-white text-black px-4 py-2 rounded-lg"
          >
            Novo Projeto
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8">
          Seus Projetos
        </h2>

        {isLoading ? (
          <p className="text-zinc-400">
            Carregando projetos...
          </p>
        ) : (
          /* data || [] garante que sempre passaremos um array, mesmo se a API falhar */
          <ProjectList projects={data || []} />
        )}
      </main>

      {openModal && (
        <CreateProjectModal
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  )
}
