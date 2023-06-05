import {LoadSolicitudByIp} from '@/domain/usecases'
import {DbLoadsolicitudByIp} from '@/data/usecases'
import {SolicitudMongoRepository} from '@/infra/db'

export const makeDbLoadSolicitudByIp = ():LoadSolicitudByIp => {
    const repositorySolicitud = new SolicitudMongoRepository()
    return new DbLoadsolicitudByIp(repositorySolicitud)
} 