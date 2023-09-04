import multer from 'multer'
import {Request,Response,NextFunction} from 'express'
import { Middleware } from "@/presentation/protocols";


export const adaptMiddlewareMulter = (middleware:Middleware) => {
    return async (req:Request,res:Response,next: NextFunction) => {
        const request = {
            file: req.file,
            ...(req.headers || {})
        }
        const httpResponse = await middleware.handle(request)

        const storage = multer.diskStorage({
            destination: (req,file,cb) => {
                cb(null,'/tmp/my-uploads')
            },
            filename:(req,file,cb) => {
                const uniqueSufix = Date.now() + '_' + Math.round(Math.random() * 1E9)
                cb(null,file.filename + '-' + uniqueSufix)
            }
        })

       
        const upload = multer().single('file')
        
        upload(req,res,(error) => {
            if(error != undefined ){
                return res.status(500).json({ error: 'error' })
            }
            if(req.file != undefined) {
                next()
            }
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            })
        })
    }
}