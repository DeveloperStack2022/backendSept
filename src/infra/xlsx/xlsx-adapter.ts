import {readFile,TranslateToJson,ViewJson} from '@/data/protocols'
import xlsx,{WorkBook} from 'xlsx'

export class XslxAdapter implements readFile,TranslateToJson,ViewJson {
    
    constructor(){}

    readFile(ruta: string): WorkBook {
        const workBook = xlsx.readFile(ruta)
        return workBook
    }

    sheet_to_json(workSheet: xlsx.WorkSheet): unknown[] {
        return xlsx.utils.sheet_to_json(workSheet)
    }

    view_json(data: unknown[]): void {
        for(const itemData of data) {
            console.log(itemData)
        }
    }
    
}