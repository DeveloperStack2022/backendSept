import { adaptRoute } from '@/main/adapters'
import {makeAddSolicitudController} from '@/main/factories'
import {adminAuth,auth} from '@/main/middlewares'

import {Router} from 'express'

export default (router: Router ):void => {
    router.post('/solicitud',adaptRoute(makeAddSolicitudController()))
}