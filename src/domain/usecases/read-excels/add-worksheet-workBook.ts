import {WorkBook, WorkSheet} from 'xlsx'
export interface AddWorkSheetToWorkBook {
    add_worksheet_workbook(params: AddWorkSheetToWorkBook.Params):void
}

export namespace AddWorkSheetToWorkBook {
    export type Params = {
        woorkBook: WorkBook,
        woorkSheet: WorkSheet,
        name_sheet:string
    }
}