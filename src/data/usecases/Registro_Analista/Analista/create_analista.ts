import {CreateAnalista} from '@/domain/usecases'
import {CreateAnalista as createAnalista} from '@/data/protocols'

export class DbCreateAnalista implements CreateAnalista {
    constructor(
        private readonly create: createAnalista
    ){}

    async create_analista(data: CreateAnalista.Params): Promise<CreateAnalista.Result> {
        try {
            return await this.create.create_analista(data)
        } catch (error) {
            
        }
    }
}