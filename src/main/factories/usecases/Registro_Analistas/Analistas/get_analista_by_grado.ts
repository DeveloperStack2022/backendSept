import { DbGetAnalistaByGrado } from '@/data/usecases'
import {GetAnalistaByGrado} from '@/domain/usecases'
import {AnalistaMongoDbRepository} from '@/infra/db'

export const makeGetAnalistaByGrado = ():GetAnalistaByGrado => {
    const repo = new AnalistaMongoDbRepository()
    return new DbGetAnalistaByGrado(repo)
}