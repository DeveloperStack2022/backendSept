import { Controller, HttpResponse } from "@/presentation/protocols";
import {CreateRegistroEcu} from '@/domain/usecases'
import { serverError,ok,noContent } from "@/presentation/helpers";
import {Terminal,RadioBase} from '@/domain/models'


export class CreateRegistroEcuPresentationController implements Controller {
    constructor(
        private readonly registroEcuUseCase:CreateRegistroEcu
    ){}

    async handle(request: CreateRegistroEcuPresentationController.Request):Promise<HttpResponse> {
        const {RadioBase,Terminal:terminal} = request
        console.log(request)
        try {
            const add = await this.registroEcuUseCase.create_registro({
                terminal,
                radioBase:RadioBase
            })
            return add ? ok(add) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace CreateRegistroEcuPresentationController { 
    export type Request = {
        Terminal:Terminal,
        RadioBase?:RadioBase
    }
}