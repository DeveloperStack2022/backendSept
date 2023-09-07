import {CreateMuniciones} from '@/domain/usecases'
import {MunicionesMongoRepository} from '@/infra/db'
import {DbCreateMuniciones} from '@/data/usecases'


export const makeAddMuniciones = (): CreateMuniciones => {
    const createMuniciones = new MunicionesMongoRepository()
    return new DbCreateMuniciones(createMuniciones)
}