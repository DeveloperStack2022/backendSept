import {AddManySolicitud} from '@/domain/usecases'
import { SolicitudMongoRepository } from '@/infra/db'
import {DbAddManySolicitud} from '@/data/usecases'

export const makeDbAddManySolicitud = ():AddManySolicitud => {
    const solicitudMongoRepository = new SolicitudMongoRepository()
    return new DbAddManySolicitud(solicitudMongoRepository)
}