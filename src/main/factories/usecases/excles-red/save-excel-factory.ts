import {SaveFileExcel} from '@/domain/usecases'
import { MulterAdapter } from '@/infra/file/multer-adapter'
import {DbSaveFile} from '@/data/usecases'

export const makeDbSaveFile = (): SaveFileExcel  => {
    //Adapter Multer 
    const multerAdapter = new MulterAdapter('xlsx')
    return new DbSaveFile(multerAdapter,multerAdapter,multerAdapter)
}