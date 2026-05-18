import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()

    try {
      const response = await fetch('http://localhost:3333/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md border border-zinc-800 bg-zinc-900/40 rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-zinc-500"
          onChange={event => setEmail(event.target.value)}
          value={email}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-zinc-500"
          onChange={event => setPassword(event.target.value)}
          value={password}
          required
        />

        <button className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors">
          Entrar
        </button>

        <p className="text-zinc-400 mt-6 text-center">
          Não possui conta?{' '}
          <Link to="/register" className="text-white hover:underline">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  )
}