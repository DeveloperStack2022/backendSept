import {CreateDinero} from '@/domain/usecases'
import {CreateDinero as CreateDinero_} from '@/data/protocols'

export class DbCreatDinero implements CreateDinero {
    constructor(
        private readonly createDinero: CreateDinero_
    ){}

    async create_dinero(data: CreateDinero.Params): Promise<CreateDinero.Result> {
        return await this.createDinero.create_dinero(data)
    }
}