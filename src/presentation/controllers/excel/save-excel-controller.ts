import {Controller, HttpResponse} from '@/presentation/protocols'
import {noContent, serverError} from '@/presentation/helpers'
import {AddSolicitud,ExcelI,TranslateToJsonI,ViewData,AddManySolicitud} from '@/domain/usecases'

export class SaveExcelController implements Controller {

    constructor(
        private readonly addSolicitud: AddManySolicitud,
        private readonly readExcel:ExcelI,
        private readonly translateToJson: TranslateToJsonI,
        private readonly viewData: ViewData 
        ){}

    async handle(request: any): Promise<HttpResponse> {
        try {
            const read_excel = this.readExcel.read('C:/Users/Usuario/Documents/backendSept/dist/uploads/testt.xlsx')
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