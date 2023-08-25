import { WorkBook } from "xlsx"

export interface WriteWorkbookFile {
    write_workboot_to_file(workbook: WorkBook,filename:string):any
}
