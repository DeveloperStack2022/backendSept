import {LoadSolicitudByIp} from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import {Controller, HttpResponse} from '@/presentation/protocols'

export class LoadSolicitudByIpController implements Controller  {

    constructor(
        private readonly loadSolicitudByIpUseCase:LoadSolicitudByIp
    ){}

    async handle(request: LoadSolicitudByIpController.Request):Promise<HttpResponse> {

        try {
            const {accountId,ip} = request        
            const solicitudes = await this.loadSolicitudByIpUseCase.load_solicitud_by_caso({accountId,ip})
            return solicitudes ? ok(solicitudes) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}


export namespace LoadSolicitudByIpController {
    export type Request = {
        accountId:string;
        ip:string;
    }
}