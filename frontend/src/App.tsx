import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import { Dashboard } from './pages/dashboard'
import { ProjectDetails } from './pages/ProjectDetails'

export function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/projects/:slug"
          element={<ProjectDetails />}
        />

      </Routes>

    </BrowserRouter>
  )
}