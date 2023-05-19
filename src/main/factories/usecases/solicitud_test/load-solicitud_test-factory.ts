import {LoadSolicitudResultTest} from '@/domain/usecases'
import {DBLoadSolicitudesTest} from '@/data/usecases'
import {SolicitudTestMongoRepository} from '@/infra/db'

export const makeDbLoadSolicitudTestResult = (): LoadSolicitudResultTest => {
    const solicitudTestResultMongoRepository = new SolicitudTestMongoRepository()
    return new DBLoadSolicitudesTest(solicitudTestResultMongoRepository)
}