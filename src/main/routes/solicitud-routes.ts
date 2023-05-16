import { adaptRoute } from '@/main/adapters'
import { makeAddSolicitudController,makeLoadSolicitudesController,makeLoadSolicitudResultController } from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/solicitud',auth,adaptRoute(makeAddSolicitudController()))
  router.get('/solicitud',auth,adaptRoute(makeLoadSolicitudesController()))
  router.get('/solicitud/:solicitudId/results',auth,adaptRoute(makeLoadSolicitudResultController()))
}
