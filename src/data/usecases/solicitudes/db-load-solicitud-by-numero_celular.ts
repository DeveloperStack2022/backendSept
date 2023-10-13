import {Get_Solcitud_By_numero_celular} from '@/domain/usecases'
import {LoadSolicitudByNumeroCelularRepository} from '@/data/protocols'
import { SolicitudNumero } from '@/domain/models'

export class DbLoadSolicitudByNumerCelular implements Get_Solcitud_By_numero_celular {
    // ID
    constructor(
        private readonly loadSolicitudByNumeroCelularRepository: LoadSolicitudByNumeroCelularRepository
    ){}

    async load_solicitud_by_numero_celular(params: Get_Solcitud_By_numero_celular.Params): Promise<SolicitudNumero> {
        try {
            return await this.loadSolicitudByNumeroCelularRepository.load_solicitud_numero_celular({numero_celular:params.numero_celular})
        } catch (error) {
            return null
        }
    }
}