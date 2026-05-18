import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/sidebar'

export function AnalyticsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('@hostly:token')
    if (!token) navigate('/login')
  }, [navigate])

  const techStack = [
    { name: 'React / Next.js', percentage: '65%', color: 'bg-white', count: '4 projetos' },
    { name: 'Astro', percentage: '20%', color: 'bg-zinc-400', count: '1 projeto' },
    { name: 'HTML / JS Estático', percentage: '15%', color: 'bg-zinc-700', count: '1 projeto' },
  ]

  return (
    <div className="flex bg-black text-zinc-100 min-h-screen antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-zinc-900 bg-zinc-950/20 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-8 py-5">
            <h1 className="text-xl font-bold tracking-tight text-white">Analytics</h1>
            <p className="text-xs text-zinc-500">Métricas de tráfego, telemetria de build e infraestrutura</p>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto px-8 py-10 space-y-10">
          
          {/* Grid de Cards Principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Acessos Totais (Mês)', value: '142.8K', change: '+12.3%', up: true },
              { label: 'Tempo Médio de Build', value: '42s', change: '-4s', up: true },
              { label: 'Uso de Banda (Edge)', value: '12.4 GB', change: 'Dentro da cota', up: false },
              { label: 'Disponibilidade (Uptime)', value: '99.98%', change: 'Global', up: false },
            ].map((card, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 hover:border-zinc-800 transition duration-200">
                <p className="text-xs font-medium text-zinc-500 tracking-wider uppercase">{card.label}</p>
                <p className="text-2xl font-bold text-white mt-2 tracking-tight">{card.value}</p>
                <span className={`text-xs font-mono mt-1 inline-block ${card.up ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  {card.change}
                </span>
              </div>
            ))}
          </div>

          {/* Seção Estatística de Linguagens e Tecnologias */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Distribuição de Frameworks & Tecnologias</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Análise automática com base nos arquivos JSON extraídos dos pacotes ZIP</p>
              </div>

              <div className="space-y-4">
                {techStack.map((tech, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-zinc-300">{tech.name}</span>
                      <span className="text-zinc-500 text-xs font-mono">{tech.count} ({tech.percentage})</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                      <div className={`h-full ${tech.color} rounded-full`} style={{ width: tech.percentage }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logs em Tempo Real da Infraestrutura */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Status Global de Edge</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Monitoramento dos microsserviços</p>
              </div>

              <div className="space-y-3 my-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/20 px-2 py-1.5 rounded border border-emerald-900/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                  <span>gru-1 (São Paulo) — Online</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/20 px-2 py-1.5 rounded border border-emerald-900/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                  <span>iad-1 (Virginia) — Online</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/40 px-2 py-1.5 rounded border border-zinc-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"/>
                  <span>ams-1 (Amsterdã) — Ocioso</span>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}