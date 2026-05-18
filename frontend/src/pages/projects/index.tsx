import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/sidebar'

export function ProjectsPage() {
  const navigate = useNavigate()
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('@hostly:token')
    if (!token) navigate('/login')
  }, [navigate])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0].name)
    }
  }

  const simulateUpload = (name: string) => {
    setFileName(name)
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev !== null && prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return (prev || 0) + 10
      })
    }, 200)
  }

  return (
    <div className="flex bg-black text-zinc-100 min-h-screen antialiased selection:bg-zinc-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-zinc-900 bg-zinc-950/20 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Deploy Engine</h1>
              <p className="text-xs text-zinc-500">Envie novos códigos para a borda global</p>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto px-8 py-12 flex flex-col justify-center items-center">
          <div className="w-full max-w-2xl text-center mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Publique em segundos.
            </h2>
            <p className="mt-3 text-zinc-400 text-sm">
              Arraste a pasta build comprimida em <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">.zip</code>. Nós cuidamos do roteamento, SSL e otimização de assets.
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <label 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden
                ${dragActive 
                  ? 'border-white bg-zinc-900/50 scale-[1.01]' 
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/20'
                }`}
            >
              <input 
                type="file" 
                accept=".zip" 
                className="hidden" 
                onChange={(e) => e.target.files?.[0] && simulateUpload(e.target.files[0].name)}
              />
              
              <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center z-10">
                <div className={`p-4 rounded-xl bg-zinc-900 border border-zinc-800 mb-4 text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-all duration-300 ${dragActive && 'rotate-12 scale-110'}`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-4-4m4 4l4-4M4 4h16v16H4V4z"/>
                  </svg>
                </div>
                
                {fileName ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white font-mono bg-zinc-900 px-3 py-1 rounded-md border border-zinc-800">{fileName}</p>
                    <p className="text-xs text-zinc-400">
                      {uploadProgress === 100 ? '✨ Pronto para o Deploy!' : 'Carregando arquivos para a nuvem...'}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-zinc-300 font-medium">
                      <span className="text-white underline underline-offset-4">Clique para buscar</span> ou arraste o arquivo aqui
                    </p>
                    <p className="text-xs text-zinc-500">Apenas arquivos ZIP de até 50MB</p>
                  </>
                )}
              </div>

              {/* Barra de progresso premium integrada ao fundo */}
              {uploadProgress !== null && (
                <div className="absolute bottom-0 left-0 h-1.5 bg-zinc-800 w-full">
                  <div 
                    className="h-full bg-white transition-all duration-300 ease-out shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </label>

            {uploadProgress === 100 && (
              <button 
                onClick={() => { alert('🚀 Deploy Inicializado!'); setFileName(null); setUploadProgress(null); }}
                className="w-full mt-4 bg-white text-black font-semibold text-sm py-3 rounded-xl hover:bg-zinc-200 transition active:scale-[0.99] duration-150 flex items-center justify-center gap-2 shadow-lg"
              >
                Fazer Deploy Instantâneo
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}