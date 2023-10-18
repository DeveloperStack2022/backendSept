import {LoadSolicitanteById} from '@/domain/usecases'
import {LoadSolicitanteById as LoadSolicitanteByIdRepository} from '@/data/protocols'
import { Solicitante } from '@/domain/models'

export class DbLoadSolicitanteByID implements LoadSolicitanteById {
    constructor (
        private readonly loadSolicitanteById:LoadSolicitanteByIdRepository
    ){}

    async load_solicitante_by_id(params: LoadSolicitanteById.Params): Promise<Solicitante> {
        try {
            return await this.loadSolicitanteById.load_solicitante_by_id({id_solicitante:params.id_solicitante})
        } catch (error) {
            return null
        }
    }
}