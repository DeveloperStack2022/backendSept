import {Controller, HttpResponse} from '@/presentation/protocols'
import {GetAnalistaByGrado} from '@/domain/usecases'
import { noContent, serverError,ok } from '@/presentation/helpers'

export class GetAnalistByGrado implements Controller {
    constructor(
        private readonly getAnalistaByGrado: GetAnalistaByGrado
    ){}

    async handle(request: GetAnalistByGrado.Request):Promise<HttpResponse>  {
        try {
            // TODO: Este es el que manda para Mostrar al Layer Presenter
            const analista = await this.getAnalistaByGrado.get_analista_by_grado(request.grado)      
            return analista ? ok({analistas: analista}) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace GetAnalistByGrado {
    export type Request = {
        grado:string;
    }
}