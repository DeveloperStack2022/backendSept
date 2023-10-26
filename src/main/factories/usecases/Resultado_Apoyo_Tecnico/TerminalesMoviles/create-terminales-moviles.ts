import {CreateTerminalesMoviles} from '@/domain/usecases'
import {TerminalesMovilesMongoRepository} from '@/infra/db'
import {DbCreateTerminalesMoviles} from '@/data/usecases'

export const makeCreateTerminalesMoviles = (): CreateTerminalesMoviles => {
    const terminalesMoviles = new TerminalesMovilesMongoRepository()
    return new DbCreateTerminalesMoviles(terminalesMoviles)
}