import {GetAnalistaByNumCl} from '@/domain/usecases'
import { AnalistaMongoDbRepository } from '@/infra/db'
import {DbGetAnalistaByNumCl} from '@/data/usecases'

export const makeDbGetAnalistaByNumCl = () : GetAnalistaByNumCl => {
    const repositoryAnalista = new AnalistaMongoDbRepository()
    return new DbGetAnalistaByNumCl(repositoryAnalista)
}