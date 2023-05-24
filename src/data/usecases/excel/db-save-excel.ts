import {ExcelI,TranslateToJsonI,ViewData} from '@/domain/usecases'
import {readFile,TranslateToJson,ViewJson} from '@/data/protocols'

export class DbExcelSave implements ExcelI,TranslateToJsonI,ViewData {

    constructor(
        private readonly readFile: readFile,
        private readonly translateToJson: TranslateToJson,
        private readonly viewData:  ViewJson
    ){}

    read(ruta: string) {
        if(ruta != ''){
            return this.readFile.readFile(ruta)
        }
        return null 
    }
    sheet_to_json(workSheet: any): unknown[] {
        return this.translateToJson.sheet_to_json(workSheet)
    }

    view_json(data: unknown[]): unknown[] {
        return this.viewData.view_json(data)
    }

}