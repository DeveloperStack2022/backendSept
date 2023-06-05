import {LoadSolicitudByCaso} from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers';
import { Controller, HttpResponse } from "@/presentation/protocols";

export class LoadSolicitudByCasoController implements Controller {

    constructor(
        private readonly loadSolicitudByCasoUseCase: LoadSolicitudByCaso
    ){}

    async handle(request: LoadSolicitudByCasoController.Request): Promise<HttpResponse>{
        try {
            const {caso,accountId} = request
            const solicitudes = await this.loadSolicitudByCasoUseCase.load_solicitud_by_caso({accountId,caso})
            return solicitudes ? ok(solicitudes) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}


export namespace LoadSolicitudByCasoController {
    export type Request = {
        accountId:string;
        caso:string;
    }
}