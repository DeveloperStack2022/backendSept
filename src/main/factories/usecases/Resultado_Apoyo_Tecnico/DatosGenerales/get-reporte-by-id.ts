import {DbGetReporteApoyoTecnicoById} from '@/data/usecases'
import {DatosGeneralesMongoRepository} from '@/infra/db'
import {GetReporteApoyoTecnicoById} from '@/domain/usecases'
export const makeGetReporteById = ():GetReporteApoyoTecnicoById => {
    const datosGeneralesRepository = new DatosGeneralesMongoRepository()
    return new DbGetReporteApoyoTecnicoById(datosGeneralesRepository)
}