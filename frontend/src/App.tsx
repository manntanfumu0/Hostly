import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard } from './pages/dashboard'
import { ProjectsPage } from './pages/projects'
import { AnalyticsPage } from './pages/analytics' // 🚀 Importando tela de Analytics Premium
import { SettingsPage } from './pages/settings'   // 🚀 Importando tela de Settings Dinâmica
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ProjectDetails } from './pages/ProjectDetails'
import { ProtectedRoute } from './components/ProtectedRoute'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home / Dashboard Principal (Apenas visualização limpa de cards ativos) */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Aba Projects (Aba exclusiva para a caixa interativa de Upload/ZIP) */}
        <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />

        {/* Aba Analytics (Gráficos nativos, stacks de tecnologia e logs globais) */}
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />

        {/* Aba Settings (Gerenciador de tokens secretos de API CLI e segurança) */}
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        {/* Detalhes do Projeto */}
        <Route path="/projects/:slug" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}