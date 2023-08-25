import {CreateNewWorkBook,CreateFileExcel,CreateNewWorkSheet,AddWorkSheetToWorkBook} from '@/domain/usecases'
import {CreateWorkBook,CreateworkSheet,AddWorkSheetToWorks, WriteWorkbookFile,} from '@/data/protocols'
import { WorkBook,WorkSheet } from 'xlsx'

export class GenerateWorkBook implements  AddWorkSheetToWorkBook,CreateFileExcel,CreateNewWorkSheet {

    constructor(
        private readonly createWorkBook:CreateWorkBook,
        private readonly createWorkSheet: CreateworkSheet,
        private readonly addWorkSheetToWork: AddWorkSheetToWorks,
        private readonly writeWorkBookToFile: WriteWorkbookFile 
    ){}


    create_new_WorkBook(): WorkBook {
        return this.createWorkBook.create_new_workbok()
    }

    create_new_worksheet(data: unknown[]): WorkSheet {
        return this.createWorkSheet.create_new_worksheet(data)
    }

    add_worksheet_workbook(params: AddWorkSheetToWorkBook.Params): void {
        return this.addWorkSheetToWork.add_worksheet_to_workbook(params.woorkBook,params.woorkSheet,params.name_sheet)
    }

    create_file_excel(params: CreateFileExcel.Params) {
        return this.writeWorkBookToFile.write_workboot_to_file(params.workBook,params.file_name)
    }

}