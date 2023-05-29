import {SaveFileExcel} from '@/domain/usecases'
import {Storage,multerSingle,FileFilter} from '@/data/protocols'

export class DbSaveFile implements SaveFileExcel {

    constructor(
        private readonly multerStorage:Storage,
        private readonly multerSingle:multerSingle,
        private readonly mulerFilterFile: FileFilter
    ){}

    save(file: Express.Multer.File): boolean {
        const multerSingle =  this.multerSingle.single('file',this.multerStorage.diskStorage('../uploads','excelfile'),this.mulerFilterFile.fileFilter())
        return true
    }
}