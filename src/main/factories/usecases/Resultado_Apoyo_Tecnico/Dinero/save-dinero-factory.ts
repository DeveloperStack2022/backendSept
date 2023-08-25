import {CreateDinero} from '@/domain/usecases'
import {DineroMongoRepository} from '@/infra/db'
import {DbCreatDinero} from '@/data/usecases'

export const makeAddDinero = (): CreateDinero => {
    const datosGeneralesMongoRepository = new DineroMongoRepository()
    return new DbCreatDinero(datosGeneralesMongoRepository)
}