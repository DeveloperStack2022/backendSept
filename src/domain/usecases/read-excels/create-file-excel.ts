import {WorkBook} from 'xlsx'

export interface CreateFileExcel {
    create_file_excel(params: CreateFileExcel.Params):any
}
export namespace CreateFileExcel {
    export type Params = {
        workBook: WorkBook,
        file_name: string
    }
}