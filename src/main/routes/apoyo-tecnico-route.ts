import { makeAddRegistroApoyoTecnico,makeGetReportesApoyoTecnico,makeGetReporteApoyoTecnicoById,makeGetResultsByRangeDate_ } from '@/main/factories'
import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'
import multer from 'multer'
import path from 'path'



const whitelist = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp'
]

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
      cb(null,path.join(__dirname,'../../../src/Upload_Anexos'))
  },
  filename:  (req, file, cb) => {
      const url_img = Math.floor(Math.random() * 10000 + 1)
      req.image_anexo =  url_img + "." + file.originalname.split('.')[1].toLowerCase()
      cb(null,req.image_anexo);
  }
})
const fileFiler = (req,file,cb) => {
  if (!whitelist.includes(file.mimetype)) {
    return cb(new Error('file is not allowed'))
  }

  cb(null, true)
}



export default (router: Router): void => {
  router.post('/registroApoyoTecnico', multer({storage,fileFilter:fileFiler}).single('upload_anexo'), adaptRoute(makeAddRegistroApoyoTecnico()))
  router.get('/getApoyoTecnico',adaptRoute(makeGetReportesApoyoTecnico()))
  router.get('/getApoyoTecnicoId/:id',adaptRoute(makeGetReporteApoyoTecnicoById()))
  router.get('/getResultByRangeDate',adaptRoute(makeGetResultsByRangeDate_()))
  // router.get('/getResultByRangeDateYear',adaptRoute(makeGetResultsByRangeDate_()))
}
