import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'
import {makeAddRegistroPraeController} from '@/main/factories'

export default (router:Router):void => {
    router.post('/registroPrae',adaptRoute(makeAddRegistroPraeController()))
}