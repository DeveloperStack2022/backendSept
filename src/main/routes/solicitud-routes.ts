import { adaptRoute } from '@/main/adapters'
import { makeAddSolicitudController,makeLoadSolicitudesController,makeLoadSolicitudResultController} from '@/main/factories'
import {makeLoadSolicitudByCasoControllerFactory,makeLoadSolicitudByIpControllerFactory} from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/solicitud',auth,adaptRoute(makeAddSolicitudController()))
  router.get('/solicitud',auth,adaptRoute(makeLoadSolicitudesController()))
  router.get('/solicitud/:solicitudId/results',auth,adaptRoute(makeLoadSolicitudResultController()))
  // Peticiones por numero celulares
  // router.get('/solicitud/:numeroCelular',adaptRoute(makeLoadSolicitudByNumCelularController()))
  router.get('/solicitud_caso/:caso',adaptRoute(makeLoadSolicitudByCasoControllerFactory()))
  router.get('/solicitud_ip/:ip',adaptRoute(makeLoadSolicitudByIpControllerFactory()))
  // router.get('/solicitud_numero/:numeroCelular',adaptRoute())
}
