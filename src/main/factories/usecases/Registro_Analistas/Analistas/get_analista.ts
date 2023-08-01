import {Get_Analista} from '@/domain/usecases'
import {DbGetAnalista} from '@/data/usecases'
import {AnalistaMongoDbRepository} from '@/infra/db'

export const makeDbGetAnalista = (): Get_Analista => {
    const repositoryAnalista = new AnalistaMongoDbRepository()
    return new DbGetAnalista(repositoryAnalista) 
}