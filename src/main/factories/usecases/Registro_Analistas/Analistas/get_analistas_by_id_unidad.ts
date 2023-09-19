import { DbGetAnalistaByIdUnidad } from '@/data/usecases'
import {GetAnalistaByIdUnidad as GetAnalistasByIdUnidad} from '@/domain/usecases'
import { AnalistaMongoDbRepository } from '@/infra/db'

export const  makeGetAnalistasByUnidad = ():GetAnalistasByIdUnidad => {
    const repo = new AnalistaMongoDbRepository()
    return new DbGetAnalistaByIdUnidad(repo)
} 
