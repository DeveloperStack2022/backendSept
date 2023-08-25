import {CreateSustanciasIlegales} from '@/domain/usecases'
import {SustanciasIlegalesMongoRepository} from '@/infra/db'
import {DbCreateSustanciasIlegales} from '@/data/usecases'

export const makeAddSustanciasIlegales = (): CreateSustanciasIlegales => {
    const sustanciasIlegalesRepository = new SustanciasIlegalesMongoRepository()
    return new DbCreateSustanciasIlegales(sustanciasIlegalesRepository)
}