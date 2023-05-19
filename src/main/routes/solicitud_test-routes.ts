import {adaptRoute} from '@/main/adapters'
import {makeLoadSolicitudTestController} from '@/main/factories'
import { auth } from '@/main/middlewares'
import {Router} from 'express'

export default (router:Router):void => {
    router.get('/solicitud_test',auth,adaptRoute(makeLoadSolicitudTestController()))
}