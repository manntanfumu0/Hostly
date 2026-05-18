import { Link } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-zinc-800 bg-zinc-950 p-6">

      <div className="mb-10">

        <h1 className="text-2xl font-bold text-white">
          Hostly
        </h1>

        <p className="text-zinc-500 text-sm mt-1">
          Cloud Platform
        </p>

      </div>

      <nav className="space-y-2">

        <Link
          to="/"
          className="block px-4 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors text-white"
        >
          Dashboard
        </Link>

        <Link
          to="/"
          className="block px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white"
        >
          Projects
        </Link>

        <Link
          to="/"
          className="block px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white"
        >
          Analytics
        </Link>

        <Link
          to="/"
          className="block px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white"
        >
          Settings
        </Link>

      </nav>

    </aside>
  )
}
