import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:3333/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.token) {
        localStorage.setItem('@hostly:token', data.token)
        localStorage.setItem('@hostly:user', JSON.stringify(data.user))
        navigate('/')
      } else {
        alert('E-mail ou senha incorretos.')
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert('Não foi possível conectar ao servidor backend.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 font-sans">
      
      {/* 🚀 Novo Ícone Exclusivo Hostly (Conexões Cloud/H) */}
      <div className="mb-6 bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800">
        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 6C2.89543 6 2 6.89543 2 8V10C2 11.1046 2.89543 12 4 12H20C21.1046 12 22 11.1046 22 10V8C22 6.89543 21.1046 6 20 6M4 6V18M20 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 14H20M4 14C2.89543 14 2 14.8954 2 16V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V16C22 14.8954 21.1046 14 20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2"/>
        </svg>
      </div>

      <div className="w-full max-w-[400px] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#f5f5f5]">
            Log in to Hostly
          </h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-3">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={event => setEmail(event.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333333] rounded-md text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#888888] focus:ring-1 focus:ring-[#888888] transition disabled:opacity-50"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={event => setPassword(event.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333333] rounded-md text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#888888] focus:ring-1 focus:ring-[#888888] transition disabled:opacity-50"
            required
          />

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-[#ededed] font-medium py-2 rounded-md text-sm transition duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              'Continue with Email'
            )}
          </button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-[#333333]"></div>
        </div>

        <div className="space-y-2">
          <button type="button" disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 bg-black border border-[#333333] hover:bg-[#111111] py-2 rounded-md text-sm font-medium transition disabled:opacity-50">
            Continue with GitHub
          </button>
          <button type="button" disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 bg-black border border-[#333333] hover:bg-[#111111] py-2 rounded-md text-sm font-medium transition disabled:opacity-50">
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-[#666666] pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-white hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}