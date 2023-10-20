import { DbCreateRegistroEcu } from '@/data/usecases'
import {CreateRegistroEcu} from '@/domain/usecases'
import { EcuMongoRepository } from '@/infra/db'

export const makeCreateRegistroEcuFactory = ():CreateRegistroEcu => {
    const repository = new EcuMongoRepository()
    return new DbCreateRegistroEcu(repository)
}