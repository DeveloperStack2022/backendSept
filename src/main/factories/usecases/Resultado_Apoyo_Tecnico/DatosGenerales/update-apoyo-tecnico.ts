import {UpdateDatosGenerales} from '@/domain/usecases'
import {DatosGeneralesMongoRepository} from '@/infra/db'
import {DbUpdateDatosGenerales} from '@/data/usecases'

export const makeUpdateApoyoTecnico = (): UpdateDatosGenerales => {
    const datosGeneraleMongoRepository = new DatosGeneralesMongoRepository()
    return new DbUpdateDatosGenerales(datosGeneraleMongoRepository)
}