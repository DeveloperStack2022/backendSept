import {WorkBook, WorkSheet} from 'xlsx'

export interface AddWorkSheetToWorks {
    add_worksheet_to_workbook(woork_book:WorkBook,workSheet:WorkSheet,name_sheet:string):void
}
