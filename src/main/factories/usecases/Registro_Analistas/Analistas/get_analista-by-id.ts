import {GetAnalistaByIdUnidad} from '@/domain/usecases'
import {DbGetAnalistaByIdUnidad} from '@/data/usecases'
import {AnalistaMongoDbRepository} from '@/infra/db'

export const makeDbGetAnalistaById = (): GetAnalistaByIdUnidad => {
    const repositoryAnalista = new AnalistaMongoDbRepository()
    return new DbGetAnalistaByIdUnidad(repositoryAnalista) 
}