import { Controller,HttpResponse } from "@/presentation/protocols";
import {
    CreateRegistroPrae
} from '@/domain/usecases'
import { serverError,ok,noContent } from "@/presentation/helpers";
// Domain 
import {PraeModel} from '@/domain/models'

export class CreateRegistroPraePresentationController implements Controller {
    constructor(
        private readonly registroPrae:CreateRegistroPrae 
    ){}

    async handle(request: CreateRegistroPraePresentationController.Request):Promise<HttpResponse> {
        try {
            // Verfication si existe el usuario - como ingresador de prae. 
            const {analista,fecha,motivo,operador,celular,direccion,email,gdo,placas,telefono} = request;
            const analista_created = await this.registroPrae.create_registr({
                analista,
                fecha,
                motivo,
                operador,
                celular,
                direccion,
                email,
                gdo,
                placas,
                telefono
            })
            
            return analista_created ? ok({created:analista_created}) : noContent()
        } catch (error) {
            return serverError(error)
        }
    } 
}

export namespace CreateRegistroPraePresentationController {
    export type Request = Omit<PraeModel,'id'>
}