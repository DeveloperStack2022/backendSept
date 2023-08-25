import {WorkBook} from 'xlsx'
import {AddWorkSheetToWorkBook,CreateFileExcel,CreateNewWorkSheet} from '@/domain/usecases'

export interface CreateNewWorkBook extends AddWorkSheetToWorkBook,CreateFileExcel,CreateNewWorkSheet  {
    create_new_WorkBook():WorkBook
}

// import {TranslateToJsonI,ViewData} from '@/domain/usecases'
// export interface ExcelI extends  TranslateToJsonI,ViewData {
//     read(ruta:string):any
// }