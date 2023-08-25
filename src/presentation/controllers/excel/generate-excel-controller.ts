import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError,ok } from "@/presentation/helpers";
import {CreateNewWorkSheet,CreateNewWorkBook,LoadSolicitudesForDate,AddWorkSheetToWorkBook,CreateFileExcel} from '@/domain/usecases'

export class GenerateExcelController implements Controller {
    constructor(
        private readonly createNewWorkBook: CreateNewWorkBook,
        private readonly getSolicitudesDb: LoadSolicitudesForDate,
        private readonly createNewWorkSheet: CreateNewWorkSheet,
        private readonly addWorkSheetToWorkBook: AddWorkSheetToWorkBook,
        private readonly writeWorkBookExcel: CreateFileExcel
    ){}

    async handle(request: Request): Promise<HttpResponse>{
        try {
            
            let start_date = new Date(request.start_date)
            let end_date = new Date(request.end_date)

            const new_workbook = this.createNewWorkBook.create_new_WorkBook()
            // GetDataBd
            const solicitudes = await this.getSolicitudesDb.load_solicitudes_for_date({start_date:start_date,end_date:end_date})
            console.log(solicitudes)
            const create_new_worksheet = this.createNewWorkSheet.create_new_worksheet(solicitudes)
            
            const add_worksheet_to_workBook = this.addWorkSheetToWorkBook.add_worksheet_workbook({woorkBook:new_workbook,woorkSheet:create_new_worksheet,name_sheet:`${request.start_date} - ${request.end_date}`})
            const created = this.writeWorkBookExcel.create_file_excel({workBook:new_workbook,file_name:'file_created.xlsx'})
            
            return ok({'data':'ok'})
        } catch (error) {
            console.log(error)
            serverError(error)
        }
    }
}

export type Request = {
    start_date:string;
    end_date:string
}