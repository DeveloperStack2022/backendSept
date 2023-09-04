import { AccessDeniedError } from "../errors";
import { forbidden, serverError,ok } from "../helpers";
import { HttpResponse, Middleware } from "../protocols";
import {SaveFileImageAnexo} from '@/domain/usecases'

export class MulterImageAnexoMiddleware implements Middleware {
    constructor(
        private readonly saveFile:SaveFileImageAnexo
    ) {}
    async handle(httpRequest: MulterImageAnexoMiddleware.Request):Promise<HttpResponse> {
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


export namespace MulterImageAnexoMiddleware {
    export type Request = {
        file: Express.Multer.File
    }
}