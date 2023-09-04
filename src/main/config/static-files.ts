import express, { Express } from 'express'
import { resolve } from 'path'

export default (app: Express): void => {
  app.use('/static', express.static(resolve(__dirname, '../../static')))
  app.use('/uploads_anexo', express.static(resolve(__dirname, '../../Upload_Anexos')))
}
