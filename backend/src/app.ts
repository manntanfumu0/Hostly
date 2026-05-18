import express from 'express'
import cors from 'cors'

import { routes } from './routes' // <-- Mudamos aqui para importar o index global

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes) // <-- Agora o Express ativa o /auth e o /projects de uma vez só!

export { app }