import type { Project } from '../../types/project'

interface Props {
  projects: Project[]
}

export function ProjectList({ projects }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map(project => (
        <div 
          key={project.id} 
          className="border border-zinc-800 bg-zinc-900/40 p-6 rounded-xl hover:border-zinc-700 transition-colors flex flex-col justify-between min-h-[180px]"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                project.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mb-4">{project.description}</p>
          </div>
          
          <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-800/80 pt-3">
            <span>Framework: <strong className="text-zinc-300">{project.framework}</strong></span>
            <span>{project.visibility}</span>
          </div>
        </div>
      ))}
    </div>
  )
}