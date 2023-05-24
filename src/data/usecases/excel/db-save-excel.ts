import {ExcelI} from '@/domain/usecases'
import {readFile} from '@/data/protocols'

export class DbExcelSave implements ExcelI {

    constructor(
        private readonly readFile: readFile 
    ){}

    read(ruta: string) {
        if(ruta != ''){
            return this.readFile.readFile(ruta)
        }
        return null 
    }
}