import {adaptRoute} from '@/main/adapters'
import {adaptMulter as multer} from '@/main/middlewares'
import {makeLoadExcelController,makeSaveExcelController} from '@/main/factories'
// import {auth} from '@/main/middlewares'
import {Router} from 'express'

export default (router:Router):void => {
    router.get('/read_excel',adaptRoute(makeLoadExcelController()))
    router.post('/uploadFile',multer,adaptRoute(makeSaveExcelController()))
}