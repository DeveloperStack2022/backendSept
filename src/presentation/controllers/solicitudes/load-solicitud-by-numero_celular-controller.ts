import { Get_Solcitud_By_numero_celular} from "@/domain/usecases";
import { noContent,ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";


export class LoadSolicitudByNumeroCelularController implements Controller {
    constructor(
            private readonly loadSolicitudByNumeroCeluar:Get_Solcitud_By_numero_celular
        ){}
    async handle(request: LoadSolicitudByNumeroCelularController.Request):Promise<HttpResponse>{
        try {
            const {numero_celular} = request
            const solicitud = await this.loadSolicitudByNumeroCeluar.load_solicitud_by_numero_celular({numero_celular})
            return solicitud ? ok(solicitud) : noContent()
        } catch (error) {
            serverError(error)
        }   
    }

}

export namespace LoadSolicitudByNumeroCelularController {
    export type Request = {
        numero_celular:string;
    }
}