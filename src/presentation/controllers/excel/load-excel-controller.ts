import { Controller, HttpResponse } from "@/presentation/protocols";
import {ExcelI} from '@/domain/usecases'
import { serverError,ok } from "@/presentation/helpers";
import path,{dirname} from 'path'


export class LoadExcelController implements Controller {
    constructor(
        private readonly readExcel: ExcelI
    ){}

    async handle(request: any): Promise<HttpResponse> {
        try {
            
            // console.log(path.resolve(__dirname,'../src'))
            // console.log(__dirname)
            // console.log(path.dirname('/src/'))
            // console.log(dirname(require.name))
            // await this.readExcel.read(`${path.join(__dirname, '/uploads/upload.xlsx') }`)
            return ok({
                'data':'ok'
            })
        } catch (error) {
            return serverError(error)
        }
    }
}