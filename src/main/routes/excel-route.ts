import {adaptRoute} from '@/main/adapters'
// import {adaptMulter as multer} from '@/main/middlewares'
// import {multer} from '@/main/middlewares'
import {makeLoadExcelController,makeSaveExcelController,makeGenerateExcelController} from '@/main/factories'
// import {auth} from '@/main/middlewares'
import {Router} from 'express'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,'../../uploads'))
    },
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})


export default (router:Router):void => {
    router.get('/read_excel',adaptRoute(makeLoadExcelController()))
    router.post('/uploadFile',multer({storage}).single('file'),adaptRoute(makeSaveExcelController()))
    router.get('/download_excel',adaptRoute(makeGenerateExcelController()))
}