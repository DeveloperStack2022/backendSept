import { adaptRoute } from '@/main/adapters'
import {makeAddSolicitudController,makeLoadSolicitudesController} from '@/main/factories'
import {auth} from '@/main/middlewares'
import {Router} from 'express'


export default (router: Router ):void => {
    router.post('/solicitud',auth,adaptRoute(makeAddSolicitudController()))
    router.get('/solicitudes',auth,adaptRoute(makeLoadSolicitudesController()))
}