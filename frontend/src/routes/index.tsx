import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard } from '../pages/dashboard'
import { ProjectDetails } from '../pages/ProjectDetails'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* Rota dinâmica para os detalhes do projeto */}
        <Route path="/projects/:slug" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  )
}