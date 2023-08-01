import { Controller, HttpResponse } from "@/presentation/protocols";
import {Get_Analista} from '@/domain/usecases'
import {ok,noContent,serverError} from '@/presentation/helpers'

export class GetAnalista implements Controller {
    constructor(
        private readonly getAnalista: Get_Analista
    ){}

    async handle(request: GetAnalista.Request):Promise<HttpResponse> {
        try {
            const {id_analista} = request
            const analista = await this.getAnalista.get_analista({id_analista})
            return analista ? ok(analista) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace GetAnalista {
    export type Request = {
        id_analista:string;
    }
}