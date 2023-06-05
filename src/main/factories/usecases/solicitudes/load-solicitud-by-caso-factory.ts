import {LoadSolicitudByCaso} from '@/domain/usecases'
import {SolicitudMongoRepository} from '@/infra/db'
import {DbLoadSolicitudByCaso} from '@/data/usecases'


export const makeDbLoadSolicitudByCasoFactory = (): LoadSolicitudByCaso => {
    const solicitudRepository = new SolicitudMongoRepository();
    return new DbLoadSolicitudByCaso(solicitudRepository)
}