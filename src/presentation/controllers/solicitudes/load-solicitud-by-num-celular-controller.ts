import {LoadSolicitudesNumCelular} from '@/domain/usecases'
import {Controller,HttpResponse} from '@/presentation/protocols'
import {noContent,serverError,ok} from '@/presentation/helpers'


export class LoadSolicitudByNumCelular implements Controller {

    constructor(
        private readonly loadSolicitudByNumCelular: LoadSolicitudesNumCelular
    ){}


    async handle(request: LoadSolicitudByNumCelular.Request):Promise<HttpResponse>{
        try {
            const solicitudParseada  = await this.loadSolicitudByNumCelular.load_solicitudes_num_celular(request)
            return solicitudParseada ? ok(solicitudParseada) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace LoadSolicitudByNumCelular {
    export type Request = {
        numeroCelular:string;
        accountId?:string;
    }
}