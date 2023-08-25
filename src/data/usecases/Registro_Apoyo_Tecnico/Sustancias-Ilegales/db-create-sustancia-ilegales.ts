import {CreateSustanciasIlegales} from '@/domain/usecases'
import {CreateSustanciasIlegales as CreateSustanciasIlegales_} from '@/data/protocols'

export class DbCreateSustanciasIlegales implements CreateSustanciasIlegales {
    constructor(
        private readonly createSustanciasIlegales: CreateSustanciasIlegales_
    ){}

    async create_sustancias_ilegales(data: CreateSustanciasIlegales.Params): Promise<CreateSustanciasIlegales.Result> {
        return await this.createSustanciasIlegales.create_sustancias_ilegales(data)
    }
}