import {LoadSolicitudesForDate} from '@/domain/usecases'
import { SolicitudMongoRepository } from '@/infra/db'
import {DbLoadSolicitudesForDate} from '@/data/usecases'

export const makeDbLoadSolicitudesForDate = ():LoadSolicitudesForDate => {
    const solicitudMongoRepository = new SolicitudMongoRepository()
    return new DbLoadSolicitudesForDate(solicitudMongoRepository)
}