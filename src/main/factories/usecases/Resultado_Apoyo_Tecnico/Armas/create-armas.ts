import {CreateArmas} from '@/domain/usecases'
import {ArmasMongoRepository} from '@/infra/db'
import {DbCreateArmas} from '@/data/usecases'

export const makeAddArmas = (): CreateArmas => {
    const aramasMongoRepository = new ArmasMongoRepository()
    return new DbCreateArmas(aramasMongoRepository)
}