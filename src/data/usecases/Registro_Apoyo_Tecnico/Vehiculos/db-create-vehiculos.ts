import { CreateVehiculos } from "@/domain/usecases";
import {CreateVehiculos as CreateVehiculos_} from '@/data/protocols'


export class DbCreateVehiculos implements CreateVehiculos {
    constructor(
        private readonly createVehiculos: CreateVehiculos_
    ){}

    async create_vehiculos(data: CreateVehiculos.Params): Promise<CreateVehiculos.Result> {
        return await this.createVehiculos.create_vehiculos(data)
    }
}