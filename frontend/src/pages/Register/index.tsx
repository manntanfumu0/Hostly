import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export function Register() {

  const navigate = useNavigate()

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  async function handleRegister(
    event: React.FormEvent
  ) {

    event.preventDefault()

    await fetch(
      'http://localhost:3333/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    )

    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md border border-zinc-800 bg-zinc-900/40 rounded-2xl p-8"
      >

        <h1 className="text-3xl font-bold mb-6">
          Criar Conta
        </h1>

        <input
          type="text"
          placeholder="Nome"
          className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 mb-4"
          onChange={event =>
            setName(event.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 mb-4"
          onChange={event =>
            setEmail(event.target.value)
          }
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 mb-6"
          onChange={event =>
            setPassword(event.target.value)
          }
        />

        <button
          className="w-full bg-white text-black py-3 rounded-lg font-medium"
        >
          Criar Conta
        </button>

        <p className="text-zinc-400 mt-6 text-center">

          Já possui conta?

          {' '}

          <Link
            to="/login"
            className="text-white"
          >
            Entrar
          </Link>

        </p>

      </form>

    </div>
  )
}
