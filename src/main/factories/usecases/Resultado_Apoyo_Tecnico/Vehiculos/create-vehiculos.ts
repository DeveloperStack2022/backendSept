import {CreateVehiculos} from '@/domain/usecases'
import {VehiculoMongoRepository} from '@/infra/db'
import {DbCreateVehiculos} from '@/data/usecases'

export const makeAddVehiculos = (): CreateVehiculos => {
    const vehiculoMongoRepository = new VehiculoMongoRepository()
    return new DbCreateVehiculos(vehiculoMongoRepository)
}