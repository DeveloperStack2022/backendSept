import {readFile,TranslateToJson,ViewJson} from '@/data/protocols'
import xlsx,{WorkBook} from 'xlsx'

export class XslxAdapter implements readFile,TranslateToJson,ViewJson {
    
    readFile(ruta: string): WorkBook {
        const workBook = xlsx.readFile(ruta)
        return workBook
    }

    sheet_to_json(workSheet: any): unknown[] {
        return xlsx.utils.sheet_to_json(workSheet,{raw:false})
    }

    view_json(data: unknown[]):unknown[] {
        return data.map(item => item)
    }
    
}