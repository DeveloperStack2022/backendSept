import { AccessDeniedError } from "../errors";
import { forbidden, serverError } from "../helpers";
import { HttpResponse, Middleware } from "../protocols";
import {ValidationFile} from '@/domain/usecases'
export class MulterMiddleware implements Middleware {
    constructor(
        // Verificacion si es valido el archivo DI
        private readonly validationFile: ValidationFile
    ){}

    async handle(httpRequest: MulterMiddleware.Request):Promise<HttpResponse> {
        try {
            const {file} = httpRequest
            const isValidate = await this.validationFile.validate(file)
            if(!isValidate) {
                return forbidden(new AccessDeniedError())
            }
        } catch (error) {
            return serverError(error)
        }
            

    }
}


export namespace MulterMiddleware {
    export type Request = {
        file: Buffer
    }
}