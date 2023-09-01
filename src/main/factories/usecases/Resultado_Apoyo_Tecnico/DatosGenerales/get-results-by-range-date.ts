import {DbGetResultsByRangeDate} from '@/data/usecases'
import { DatosGeneralesMongoRepository } from '@/infra/db'
import {GetResultsByRangTotal} from '@/domain/usecases'


export const makeGetResultsByRangeDate = (): GetResultsByRangTotal  => {
    const datosGeneralesRepository = new DatosGeneralesMongoRepository()
    return new DbGetResultsByRangeDate(datosGeneralesRepository)
}