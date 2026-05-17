interface Props {
  project: {
    id: string
    name: string
    description?: string
    framework: string
    status: string
    slug: string
    createdAt: string
  }
}

export function ProjectCard({ project }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          {project.name}
        </h2>

        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
          {project.status}
        </span>
      </div>

      <p className="text-zinc-400 mt-3">
        {project.description}
      </p>

      <div className="mt-5 space-y-2 text-sm">
        <p className="text-zinc-500">
          Framework: {project.framework}
        </p>

        <p className="text-zinc-500">
          Criado em:{' '}
          {new Date(project.createdAt).toLocaleDateString()}
        </p>

        <a
          href="#"
          className="text-indigo-400 hover:underline"
        >
          hostly.app/{project.slug}
        </a>
      </div>
    </div>
  )
}