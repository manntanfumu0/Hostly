import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/sidebar'

export function SettingsPage() {
  const navigate = useNavigate()
  const [tokenVisible, setTokenVisible] = useState(false)
  const [apiToken, setApiToken] = useState('hostly_live_tk_8913hdasj981h3289hdasdsa')

  useEffect(() => {
    const token = localStorage.getItem('@hostly:token')
    if (!token) navigate('/login')
  }, [navigate])

  const generateNewToken = () => {
    const randomHex = Array.from({length: 24}, () => Math.floor(Math.random()*16).toString(16)).join('')
    setApiToken(`hostly_live_tk_${randomHex}`)
    alert('Novo Token de API gerado! Copie antes de sair.')
  }

  return (
    <div className="flex bg-black text-zinc-100 min-h-screen antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-zinc-900 bg-zinc-950/20 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-8 py-5">
            <h1 className="text-xl font-bold tracking-tight text-white">Settings</h1>
            <p className="text-xs text-zinc-500">Gerencie chaves secretas de deploy, tokens e dados cadastrais</p>
          </div>
        </header>

        <main className="flex-1 max-w-4xl w-full mx-auto px-8 py-10 space-y-8">
          
          {/* Seção 1: Chaves e Tokens */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white">Tokens de Acesso Pessoal</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Utilize este token para fazer deploys automatizados diretamente via CLI ou GitHub Actions</p>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type={tokenVisible ? 'text' : 'password'} 
                readOnly
                value={apiToken}
                className="flex-1 px-3 py-2 bg-black border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-700"
              />
              <button 
                onClick={() => setTokenVisible(!tokenVisible)}
                className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium rounded-lg transition"
              >
                {tokenVisible ? 'Ocultar' : 'Revelar'}
              </button>
              <button 
                onClick={generateNewToken}
                className="px-3 py-2 bg-white text-black font-semibold text-xs rounded-lg hover:bg-zinc-200 transition"
              >
                Regenerar
              </button>
            </div>
          </div>

          {/* Seção 2: Preferências Gerais */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white">Segurança da Conta</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Atualize seus dados de acesso ao ecossistema Hostly</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Senha atualizada com sucesso!'); }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-medium">Nova Senha</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-600" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-medium">Confirmar Nova Senha</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-600" />
              </div>
              <div className="sm:col-span-2 pt-2">
                <button type="submit" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium rounded-lg text-white transition">
                  Alterar Senha de Acesso
                </button>
              </div>
            </form>
          </div>

          {/* Seção Perigo */}
          <div className="bg-zinc-950 border border-red-950/40 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-red-400">Zona de Perigo</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Deletar sua conta removerá permanentemente todos os domínios, buckets e históricos de build de forma irreversível.</p>
            </div>
            <button 
              onClick={() => { if(confirm('Tem certeza? Essa ação não pode ser desfeita.')) alert('Conta deletada.'); }}
              className="px-4 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-xs font-semibold rounded-lg text-red-400 transition whitespace-nowrap"
            >
              Excluir Conta
            </button>
          </div>

        </main>
      </div>
    </div>
  )
}