import {CreateDatosGenerales} from '@/domain/usecases'
import {DatosGeneralesMongoRepository} from '@/infra/db'
import {DbCreateDatosGenerales} from '@/data/usecases'

export const makeAddReporteApoyoTecnico = (): CreateDatosGenerales => {
    const datosGeneralesMongoRepository = new DatosGeneralesMongoRepository()
    return new DbCreateDatosGenerales(datosGeneralesMongoRepository)
}