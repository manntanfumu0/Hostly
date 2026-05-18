import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

interface Project {
  id: string
  name: string
  framework: string
  description: string
  deploy_status: string
  domain: string
  slug: string
  createdAt: string
}

export function ProjectDetails() {
  const { slug } = useParams()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch(`http://localhost:3333/projects/${slug}`)
      .then(response => response.json())
      .then(data => setProject(data))
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-400 flex flex-col items-center justify-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
        <span className="text-sm font-medium font-mono animate-pulse">Carregando projeto...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
      
      {/* 🔹 HEADER COM EFEITO BLUR */}
      <header className="border-b border-zinc-900 bg-zinc-900/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Link
              to="/"
              className="text-zinc-400 hover:text-zinc-200 transition-colors font-medium"
            >
              ← Voltar
            </Link>
            <span className="text-zinc-800">/</span>
            <span className="font-mono text-zinc-400 text-xs bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
              {project.slug}
            </span>
          </div>

          <h1 className="text-base font-bold tracking-wider uppercase text-zinc-400 font-mono">
            Hostly<span className="text-emerald-500">.</span>
          </h1>
        </div>
      </header>

      {/* 🔹 CONTEÚDO PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* TOP PANEL: INFO E BADGE DE STATUS DINÂMICO */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-zinc-900">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              {project.name}
            </h1>
            <p className="text-zinc-400 text-base max-w-2xl">
              {project.description || 'Nenhuma descrição informada para este projeto.'}
            </p>
          </div>

          <div className="flex items-center">
            {project.deploy_status === 'online' ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.03)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                production online
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400 border border-amber-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                building pipeline
              </span>
            )}
          </div>
        </div>

        {/* GRID DE DETALHES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD: PROJECT INFO */}
          <div className="border border-zinc-900 bg-zinc-900/20 rounded-xl p-6 space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Project Configuration
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="text-zinc-400">Framework</span>
                <span className="font-mono text-xs font-bold bg-zinc-900 px-2.5 py-1 rounded text-zinc-300 border border-zinc-800 uppercase">
                  {project.framework}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="text-zinc-400">Production Domain</span>
                <a 
                  href={`http://${project.domain}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-mono text-xs text-emerald-400 hover:underline transition-all"
                >
                  {project.domain} ↗
                </a>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Deploy Date</span>
                <span className="text-zinc-300 text-xs font-mono">
                  {new Date(project.createdAt).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          {/* CARD: DEPLOY LOGS DINÂMICOS ESTILO TERMINAL */}
          <div className="border border-zinc-900 bg-zinc-950 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between min-h-[220px]">
            <div className="bg-zinc-900/40 px-4 py-2.5 border-b border-zinc-900 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">Deployment Logs</span>
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">STDOUT</span>
            </div>

            <div className="p-5 font-mono text-xs space-y-2 flex-1 bg-black/40">
              <p className="text-zinc-500">✔ Uploading files to isolation layer...</p>
              <p className="text-zinc-500">✔ Detecting configuration presets...</p>
              <p className="text-zinc-400">ℹ Applying default build scripts for {project.framework}.</p>
              
              {project.deploy_status === 'online' ? (
                <>
                  <p className="text-zinc-500">✔ Optimizing static chunks and routes...</p>
                  <p className="text-emerald-400 font-semibold mt-2">
                    ✔ Deploy completed successfully to edge network!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-amber-400 animate-pulse font-medium">
                    ↳ Compiling assets and bundling elements...
                  </p>
                  <p className="text-zinc-600 animate-pulse">
                    ... waiting for platform handshake ...
                  </p>
                </>
              )}
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}