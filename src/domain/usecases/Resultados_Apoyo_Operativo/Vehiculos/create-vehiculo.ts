import {Vehiculo} from '@/domain/models'

export interface CreateVehiculos {
    create_vehiculos(data:CreateVehiculos.Params):Promise<CreateVehiculos.Result>
}

export namespace CreateVehiculos {
    export type Params = Omit<Vehiculo,'id'>[]
    export type Result = string[]
}