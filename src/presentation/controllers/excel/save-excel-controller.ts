import {Controller, HttpResponse} from '@/presentation/protocols'
import {noContent, serverError} from '@/presentation/helpers'
import {AddSolicitud,ExcelI,TranslateToJsonI,ViewData} from '@/domain/usecases'

export class SaveExcelController implements Controller {

    constructor(
        // private readonly addSolicitud: AddSolicitud,
        private readonly readExcel:ExcelI,
        private readonly translateToJson: TranslateToJsonI,
        private readonly viewData: ViewData
        ){}

    async handle(request: any): Promise<HttpResponse> {
        try {
            const read_excel = this.readExcel.read('C:/Users/UsuarioXtratech1/Documents/backendSept/dist/uploads/excelTest.xlsx')
            const sheet = read_excel.SheetNames[0]
            const translateToJson =  this.translateToJson.sheet_to_json(read_excel.Sheets[sheet])
            const viewDataJson = this.viewData.view_json(translateToJson)
            viewDataJson.map(item => {
                console.log(item)
            })
            // await this.addSolicitud.add({
            //     ...read_excel
            // })
            return noContent()
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
        
    }
}