import {LoadSolicitudByCaso} from '@/domain/usecases'
import {LoadsolicitudByCasoRepository} from '@/data/protocols'

export class DbLoadSolicitudByCaso implements LoadSolicitudByCaso {

    constructor(
        private readonly loadSolicitudByCasoRepository:LoadsolicitudByCasoRepository
    ){}


    async load_solicitud_by_caso(request: LoadSolicitudByCaso.Params): Promise<LoadSolicitudByCaso.Result> {
        try {
            return await this.loadSolicitudByCasoRepository.load_solicitud_by_caso(request.caso)
        } catch (error) {
            return null
        }
    }

}