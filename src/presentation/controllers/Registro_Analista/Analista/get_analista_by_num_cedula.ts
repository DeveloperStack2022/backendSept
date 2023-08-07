import {Controller, HttpResponse} from '@/presentation/protocols'
import {GetAnalistaByNumCl} from '@/domain/usecases'
import { noContent, serverError,ok } from '@/presentation/helpers'

export class GetAnalistByNumCedula implements Controller {
    constructor(
        private readonly getAnalista: GetAnalistaByNumCl
    ){}

    async handle(request: GetAnalistByNumCedula.Request):Promise<HttpResponse>  {
        try {
            // TODO: Este es el que manda para Mostrar al Layer Presenter
            const analista = await this.getAnalista.search_analista_by_num_cl(request.numero_cedula)
            return analista ? ok(analista) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace GetAnalistByNumCedula {
    export type Request = {
        numero_cedula:string
    }
}