import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'
import {makeRegistroEcu} from '@/main/factories'

export default (router:Router):void => {
    router.post('/registroEcu',adaptRoute(makeRegistroEcu()))
}