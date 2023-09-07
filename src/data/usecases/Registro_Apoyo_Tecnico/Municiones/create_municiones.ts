import {CreateMuniciones} from '@/domain/usecases'
import {CreateMuniciones as CreateMuniciones_} from '@/data/protocols'


export class DbCreateMuniciones implements CreateMuniciones {
    
    constructor(
        private readonly createMuniciones: CreateMuniciones_
    ) {}

    async create_municiones(params: CreateMuniciones.Params): Promise<CreateMuniciones.Result> {
        return await this.createMuniciones.create_municiones(params)
    }
}