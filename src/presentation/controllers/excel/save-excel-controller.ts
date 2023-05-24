import {Controller, HttpResponse} from '@/presentation/protocols'
import {noContent, serverError} from '@/presentation/helpers'
import {AddSolicitud,ExcelI} from '@/domain/usecases'

export class SaveExcelController implements Controller {

    constructor(
        private readonly addSolicitud: AddSolicitud,
        private readonly readExcel:ExcelI
        ){}

    async handle(request: any): Promise<HttpResponse> {
        try {
            const read_excel = await this.readExcel.read('')
            await this.addSolicitud.add({
                ...read_excel
            })
            return noContent()
        } catch (error) {
            return serverError(error)
        }
        
    }
}