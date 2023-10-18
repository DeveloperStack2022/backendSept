import {LoadSolicitanteById} from '@/domain/usecases'
import {SolictanteMongoRepository} from '@/infra/db'
import {DbLoadSolicitanteByID} from '@/data/usecases'

export const makeDbLoadSolicitanteById = (): LoadSolicitanteById => {
    const solicitanteRepository = new SolictanteMongoRepository()
    return new DbLoadSolicitanteByID(solicitanteRepository)
}