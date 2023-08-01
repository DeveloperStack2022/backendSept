import {Analista,Unidad,Zona,Direcciones} from '@/domain/models'

import { Controller, HttpResponse } from "@/presentation/protocols";
import {CreateAnalista } from '@/domain/usecases'
import { noContent ,ok, serverError} from '@/presentation/helpers';


export class CreateAnalistaPresentationController implements Controller {
    constructor(
        private readonly createAnalista: CreateAnalista
    ){}

    async handle(request: CreateAnalistaPresentationController.Request):Promise<HttpResponse> {
        try {
            const data = request
            const analista_created = await this.createAnalista.create_analista({Analista: data.Anlista,Direcciones:data.Direcciones,Unidad: data.Unidad,Zona:data.Zona})
            return analista_created ? ok(analista_created) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace CreateAnalistaPresentationController {
    export type Request = {
        Anlista:Analista,
        Direcciones: Direcciones,
        Zona:Zona,
        Unidad:Unidad
    }
}