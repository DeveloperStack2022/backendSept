import { bodyParser,contentType,cors } from '@/main/middlewares'
import { Express } from 'express'
// import cors from 'cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}

/**
 * cors({
    origin:['http://localhost:3000','http://192.168.20.55:3000','http://127.0.0.1:3000']
  })
 */