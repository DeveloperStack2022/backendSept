import { DbGetReporteApoyoTecnico } from '@/data/usecases'
import {GetReporteApoyoTecnico} from '@/domain/usecases'
import { DatosGeneralesMongoRepository } from '@/infra/db'

export const makeGetReporteApoyoTecnico = (): GetReporteApoyoTecnico => {
    const datosGenralesRepository = new DatosGeneralesMongoRepository()
    return new DbGetReporteApoyoTecnico(datosGenralesRepository)
}