import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: JSX.Element
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Corrigido para buscar a chave idêntica à salva pelo Login
  const token = localStorage.getItem('@hostly:token')

  if (!token) {
    // Se não tiver token, barra o acesso e joga para a tela de login
    return <Navigate to="/login" replace />
  }

  return children
}