import {Controller, HttpResponse} from '@/presentation/protocols'
import {noContent, serverError} from '@/presentation/helpers'
import {ExcelI,TranslateToJsonI,ViewData,AddManySolicitud} from '@/domain/usecases'
import path from 'path'

export class SaveExcelController implements Controller {

    constructor(
        private readonly addSolicitud: AddManySolicitud,
        private readonly readExcel:ExcelI,
        private readonly translateToJson: TranslateToJsonI,
        private readonly viewData: ViewData 
        ){}

    async handle(request: any): Promise<HttpResponse> {
        try {
            const read_excel = this.readExcel.read(path.join(__dirname,'../../../uploads/excelTest.xlsx')) 
            const sheet = read_excel.SheetNames[0]
            const translateToJson =  this.translateToJson.sheet_to_json(read_excel.Sheets[sheet])
            const viewDataJson = this.viewData.view_json(translateToJson)
            
            await this.addSolicitud.addMany(viewDataJson as any)
            return noContent()
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
        
    }
}