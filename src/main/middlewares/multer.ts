// import { serverError } from '@/presentation/helpers'
// import { RequestHandler } from 'express'
// import multer,{FileFilterCallback} from 'multer'
// import path from 'path'

import { adaptMiddleware } from "@/main/adapters";
import {makeMulterMiddleware} from '@/main/factories'

// export const adaptMulter: RequestHandler = (req, res, next) => {
//     const diskStorage = multer.diskStorage({
//         destination: (req,rest,cb) => {
//             cb(null,path.join(__dirname, '../../uploads'))
//         },
//         filename: (req,file,cb)=>{
//             cb(null,file.originalname)
//         },
//     })

//     const fileFiler = (req,file,cb) => {
//         if(file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
//             cb(null,true)
//         }else{
//             cb(new Error('Invalid file'))
//         }
//     } 

//   const upload = multer({storage:diskStorage,fileFilter:fileFiler}).single('file')
//   upload(req, res, (error) => {
   
//     if (error !== undefined) {
//         return res.status(500).json({ error: serverError,message: 'test'})
//     }
//     if (req.file !== undefined) {
//         console.log('paso por aqui middleware multer')
//         next()
//     }
//   })
// }


export const multer = adaptMiddleware(makeMulterMiddleware())