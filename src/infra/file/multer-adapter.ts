import {Storage,FileFilter,multerSingle} from '@/data/protocols'
import multer,{StorageEngine,diskStorage,FileFilterCallback} from 'multer'
import path from 'path'

export class MulterAdapter implements Storage,FileFilter,multerSingle{
    constructor(
        private readonly extensionType: string
    ){}

    diskStorage(_: string, fileName: string):StorageEngine {
        return diskStorage({
            destination: (req,file,cb) => {
                cb(null,path.join(__dirname, '../../uploads'))
            },
            filename: (req,file,cb) => {
                cb(null,fileName)
            }
        })
    }
    fileFilter(): void {
        // let ext = path.extname(file.originalname)
        // if(this.extensionType != ext) {
        //     return callback(new Error('El archivo no es permitido'))
        // }
        // callback(null,true)
    }
    single(name: string, storage: any, fileFilter: any) {
        multer({storage,fileFilter}).single(name)
    }
}