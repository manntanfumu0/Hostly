import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { prisma } from '../database/prisma'

interface SignupDTO {
  name: string
  email: string
  password: string
}

interface SigninDTO {
  email: string
  password: string
}

export class AuthService {

  async signup({
    name,
    email,
    password
  }: SignupDTO) {

    const userAlreadyExists =
      await prisma.user.findUnique({
        where: {
          email
        }
      })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const hashedPassword =
      await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    return user
  }

  async signin({
    email,
    password
  }: SigninDTO) {

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!passwordMatch) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign(
      {},
      process.env.JWT_SECRET!,
      {
        subject: user.id,
        expiresIn: '7d'
      }
    )

    return {
      user,
      token
    }
  }
}
