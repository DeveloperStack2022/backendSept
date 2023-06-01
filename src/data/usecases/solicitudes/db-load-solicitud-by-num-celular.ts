import {LoadSolicitudesNumCelular} from '@/domain/usecases'
import {LoadNumCelularRepositoryI,LoadSolicitudByIdRepository} from '@/data/protocols'
export class DbLoadSolicitudByNumCelular implements LoadSolicitudesNumCelular {
    constructor(
        //Injection Dependency
        private readonly loadNumeroCelular: LoadNumCelularRepositoryI,
        private readonly loadSolicitudById: LoadSolicitudByIdRepository,
    ){}

    async load_solicitudes_num_celular(numero_celular: string): Promise<LoadSolicitudesNumCelular.Result> {
        try {
            const numeros_celular = await this.loadNumeroCelular.load_num_celular(numero_celular)
            if(numeros_celular.length > 0 ){ 
                // numero_celular.length -> 1 ---- 0 = numero_celular.length - 1 || numero_celular[0]
                const id_solicitud = numeros_celular[numeros_celular.length - 1].id_solicitud
                // Query Solicitud ByID  -> id_solicitud
                const solicitud_ = await this.loadSolicitudById.loadById(id_solicitud)
                console.log(solicitud_)
                return ;
            }
        } catch (error) {
            return null
        }
    }
}