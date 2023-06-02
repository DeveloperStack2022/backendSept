import {LoadSolicitudesNumCelular} from '@/domain/usecases'
import {LoadNumCelularRepositoryI,LoadSolicitudByIdRepository} from '@/data/protocols'
export class DbLoadSolicitudByNumCelular implements LoadSolicitudesNumCelular {
    constructor(
        //Injection Dependency
        private readonly loadNumeroCelular: LoadNumCelularRepositoryI,
        private readonly loadSolicitudById: LoadSolicitudByIdRepository,
    ){}

    async load_solicitudes_num_celular(request: LoadSolicitudesNumCelular.Params): Promise<LoadSolicitudesNumCelular.Result> {
       
        try {
            const numeros_celular = await this.loadNumeroCelular.load_num_celular(request.numeroCelular)
            if(numeros_celular.length > 0 ){ 
                // numero_celular.length -> 1 ---- 0 = numero_celular.length - 1 || numero_celular[0]
                const id_solicitud = numeros_celular[numeros_celular.length - 1].id_solicitud
                // Query Solicitud ByID  -> id_solicitud
               
                const solicitud_ = await this.loadSolicitudById.loadById(id_solicitud.toString())
               
                return {
                    numero_celular:request.numeroCelular,
                    solicitante: {
                        grado: solicitud_.solicitante_result[0].grado,
                        nombres_completos: solicitud_.solicitante_result[0].nombres_completos,
                        unidad: solicitud_.solicitante_result[0].unidad,
                        zona:solicitud_.solicitante_result[0].zona || ''
                    },
                    solicitud: {
                        caso: solicitud_.caso,
                        delito: solicitud_.delito,
                        organizacion_delicuencial: solicitud_.organizacion_delicuencial,
                        investigacion_previa: solicitud_.investigacion_previa
                    }
                }
            }
        } catch (error) {
           
            return null
        }
    }
}