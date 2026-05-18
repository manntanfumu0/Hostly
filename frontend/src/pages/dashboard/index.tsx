import { useState } from 'react'

import { Sidebar } from '../../components/sidebar'
import { UploadBox } from '../../components/upload-box'
import { ProjectList } from '../../components/project-list'
import { CreateProjectModal } from '../../components/create-project-modal'
import { useProjects } from '../../hooks/useProjects'

export function Dashboard() {

  const [openModal, setOpenModal] = useState(false)

  const { data, isLoading } = useProjects()

  return (
    <div className="flex bg-black text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <header className="border-b border-zinc-800">

          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

            <h1 className="text-2xl font-bold">
              Dashboard
            </h1>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Novo Projeto
            </button>

          </div>

        </header>

        <main className="max-w-7xl mx-auto px-6 py-10">

          <h2 className="text-3xl font-bold mb-8">
            Seus Projetos
          </h2>

          <div className="mb-10">
            <UploadBox />
          </div>

          {isLoading ? (

            <p className="text-zinc-400">
              Carregando projetos...
            </p>

          ) : (

            <ProjectList projects={data || []} />

          )}

        </main>

      </div>

      {openModal && (
        <CreateProjectModal
          onClose={() => setOpenModal(false)}
        />
      )}

    </div>
  )
}