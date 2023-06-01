import {LoadSolicitudesNumCelular} from '@/domain/usecases'
import {SolicitudMongoRepository,NumeroCelularMongoRepository} from '@/infra/db'
import {DbLoadSolicitudByNumCelular} from '@/data/usecases'


export const makeDbLoadSolicitudByNumCelular = (): LoadSolicitudesNumCelular => {
    const solicitudMongoRepository = new SolicitudMongoRepository()
    const numeroCelularMongoRepository = new NumeroCelularMongoRepository()
    
    return new DbLoadSolicitudByNumCelular(numeroCelularMongoRepository,solicitudMongoRepository)
}