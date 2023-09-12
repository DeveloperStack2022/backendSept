import { makeAddRegistroApoyoTecnico,makeGetReportesApoyoTecnico,makeGetReporteApoyoTecnicoById,makeGetResultsByRangeDate_ } from '@/main/factories'
import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'
import {v4} from 'uuid'
import multer,{DiskStorageOptions,StorageEngine} from 'multer'
import path from 'path'
const uuId = v4()

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
      cb(null, uuId + "." + file.originalname.split('.')[1].toLowerCase());
      req.image_anexo = uuId + "." + file.originalname.split('.')[1].toLowerCase()
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
