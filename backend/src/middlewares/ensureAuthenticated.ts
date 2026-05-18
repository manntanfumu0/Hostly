import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // 1. Buscar o token dentro do cabeçalho da requisição
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({
      error: 'Token is missing'
    })
  }

  // O formato do header é: "Bearer eyJhbGciOi..."
  // Vamos dividir a string pelo espaço para pegar só o token
  const [, token] = authHeader.split(' ')

  try {
    // 2. Validar se o token é autêntico usando a nossa chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    const { sub } = decoded as TokenPayload

    // 3. Injetar o ID do usuário dentro do objeto de requisição do Express
    request.user = {
      id: sub,
    }

    // 4. Se está tudo certo, deixa a requisição prosseguir para o Controller
    return next()
  } catch {
    return response.status(401).json({
      error: 'Invalid token'
    })
  }
}
