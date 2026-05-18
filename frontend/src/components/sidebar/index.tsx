import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
      
      <div>
        {/* Header do Menu com o Novo Logo Hostly */}
        <div className="mb-10 flex items-center gap-3">
          <div className="text-white">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 6C2.89543 6 2 6.89543 2 8V10C2 11.1046 2.89543 12 4 12H20C21.1046 12 22 11.1046 22 10V8C22 6.89543 21.1046 6 20 6M4 6V18M20 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4 14H20M4 14C2.89543 14 2 14.8954 2 16V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V16C22 14.8954 21.1046 14 20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">
              Hostly
            </h1>
            <p className="text-zinc-500 text-xs mt-1">
              Cloud Platform
            </p>
          </div>
        </div>

        {/* Links de navegação */}
        <nav className="space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-zinc-900 text-white font-medium'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-zinc-900 text-white font-medium'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-zinc-900 text-white font-medium'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`
            }
          >
            Analytics
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-zinc-900 text-white font-medium'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`
            }
          >
            Settings
          </NavLink>
        </nav>
      </div>

      <div className="border-t border-zinc-800 pt-4">
        <button 
          onClick={() => {
            localStorage.clear()
            window.location.href = '/login'
          }}
          className="w-full text-left px-4 py-2 text-sm text-zinc-500 hover:text-red-400 transition-colors"
        >
          Sair da Conta
        </button>
      </div>

    </aside>
  )
}