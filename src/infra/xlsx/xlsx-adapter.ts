import {readFile,TranslateToJson,ViewJson} from '@/data/protocols'
import xlsx,{WorkBook,WorkSheet} from 'xlsx'

export class XslxAdapter implements readFile,TranslateToJson,ViewJson {
    
    readFile(ruta: string): WorkBook {
        const workBook = xlsx.readFile(ruta)
        return workBook
    }

    sheet_to_json(workSheet: any): unknown[] {
        return xlsx.utils.sheet_to_json(workSheet,{raw:false})
    }
    
    view_json(data: unknown[]):unknown[] {
        return data.map(item => item)
    }
    
    create_new_workbok():WorkBook{
        return xlsx.utils.book_new()
    }

    // Create a new worksheet 
    create_new_worksheet(data: unknown[]):WorkSheet {
        return xlsx.utils.json_to_sheet(data)
    }
    // Add the worksheet to the workbook
    
    add_worksheet_to_workbook(woork_book:WorkBook,workSheet:unknown[],name_sheet:string):void{
        return xlsx.utils.book_append_sheet(woork_book,workSheet,name_sheet)
    }
    // Write the workbook to a file
    write_workboot_to_file(workbok:WorkBook,file_name:string):any{
        return xlsx.writeFile(workbok,file_name)
    }
}