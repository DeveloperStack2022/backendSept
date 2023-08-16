import {CreateResumenCaso} from '@/domain/usecases'
import {ResumenCasoMongoRepository} from '@/infra/db'
import {DbCreateResumenCaso} from '@/data/usecases'

export const makeAddResumenCaso = (): CreateResumenCaso => {
    const createResumenCaso = new ResumenCasoMongoRepository()
    return new DbCreateResumenCaso(createResumenCaso)
}