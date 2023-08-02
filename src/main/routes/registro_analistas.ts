import { Router } from "express";
import {adaptRoute} from '@/main/adapters'
import {makeGetAnalistaControllerFactory,makeCreateAnalistaControllerFactory} from '@/main/factories'

export default (router:Router):void => {
    router.get('/get_analista/:id_analista',adaptRoute(makeGetAnalistaControllerFactory()))
    router.post('/create_analista',adaptRoute(makeCreateAnalistaControllerFactory()))
    // router.get('/get_analista_by_cedula/:numero_cedula',adaptRoute())
}