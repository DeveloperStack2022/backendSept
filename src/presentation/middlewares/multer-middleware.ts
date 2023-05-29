import { AccessDeniedError } from "../errors";
import { forbidden, serverError,ok } from "../helpers";
import { HttpResponse, Middleware } from "../protocols";
import {SaveFileExcel} from '@/domain/usecases'

export class MulterMiddleware implements Middleware {
    constructor(
        private readonly saveFile:SaveFileExcel
    ) {}
    async handle(httpRequest: MulterMiddleware.Request):Promise<HttpResponse> {
        try {
            const {file} = httpRequest
            const save = this.saveFile.save(file)
            if(save){
                return ok({file: 'save'})
            }
            return forbidden(new AccessDeniedError())
        } catch (error) {
            return serverError(error)
        }
            

    }
}


export namespace MulterMiddleware {
    export type Request = {
        file: Express.Multer.File
    }
}