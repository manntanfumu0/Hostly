import { Request, Response } from 'express'

import { AuthService } from '../services/auth.service'

const authService = new AuthService()

export class AuthController {

  async signup(request: Request, response: Response) {

    try {

      const {
        name,
        email,
        password
      } = request.body

      const user = await authService.signup({
        name,
        email,
        password
      })

      return response.status(201).json(user)

    } catch (error) {

      return response.status(400).json({
        error: (error as Error).message
      })

    }
  }

  async signin(request: Request, response: Response) {

    try {

      const {
        email,
        password
      } = request.body

      const result = await authService.signin({
        email,
        password
      })

      return response.json(result)

    } catch (error) {

      return response.status(400).json({
        error: (error as Error).message
      })

    }
  }
}
