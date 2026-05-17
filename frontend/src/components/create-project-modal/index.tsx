import { useState } from 'react'

interface Props {
  onClose: () => void
}

export function CreateProjectModal({ onClose }: Props) {
  const [name, setName] = useState('')
  const [framework, setFramework] = useState('React')

  function handleCreateProject() {
    console.log({
      name,
      framework
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Novo Projeto
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Nome do projeto"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none"
          />

          <select
            value={framework}
            onChange={e => setFramework(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none"
          >
            <option>React</option>
            <option>Next.js</option>
            <option>Vue</option>
            <option>Angular</option>
          </select>

          <button
            onClick={handleCreateProject}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 transition"
          >
            Criar Projeto
          </button>
        </div>
      </div>
    </div>
  )
}

