import { Get_Solcitud_By_numero_celular,LoadSolicitanteById} from "@/domain/usecases";
import { noContent,ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";


export class LoadSolicitudByNumeroCelularController implements Controller {
    constructor(
            private readonly loadSolicitudByNumeroCeluar:Get_Solcitud_By_numero_celular,
            private readonly loadSolicitanteById: LoadSolicitanteById
        ){}
    async handle(request: LoadSolicitudByNumeroCelularController.Request):Promise<HttpResponse>{
        try {
            const {numeroCelular} = request
            const solicitud = await this.loadSolicitudByNumeroCeluar.load_solicitud_by_numero_celular({numero_celular:numeroCelular})
            if(solicitud){
                const solicitante = await this.loadSolicitanteById.load_solicitante_by_id({id_solicitante: solicitud.solicitud.solicitante})
                const data_ = {
                    Solicitud:{
                        caso: solicitud.solicitud.caso,
                        delito: solicitud.solicitud.delito,
                        organizacion: solicitud.solicitud.organizacion_delicuencial,
                        investigacion_previa: solicitud.solicitud.investigacion_previa,
                        nombre_fiscalia:solicitud.solicitud.nombre_fiscalia,
                        nombre_fiscal: solicitud.solicitud.nombre_fiscal
                    },
                    Analista:{
                        grado: solicitante.grado,
                        nombre_completos: solicitante.nombres_completos,
                        unidad: solicitante.unidad,
                        zona: solicitante.zona
                    }
                }
                return solicitud ? ok(data_) : noContent()
            }
            return noContent()
        } catch (error) {
            serverError(error)
        }   
    }

}

export namespace LoadSolicitudByNumeroCelularController {
    export type Request = {
        numeroCelular:string;
    }
}