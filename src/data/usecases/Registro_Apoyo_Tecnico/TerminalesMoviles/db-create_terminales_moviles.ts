import {CreateTerminalesMoviles} from '@/domain/usecases'
import {CreateTerminalesMoviles as CreateTerminalesRepository} from '@/data/protocols'

export class DbCreateTerminalesMoviles implements CreateTerminalesMoviles {
    constructor(
        private readonly createTerminalesMovilesUseCase: CreateTerminalesRepository
    ){}

    async create_terminales_moviles(params: CreateTerminalesMoviles.Request): Promise<CreateTerminalesMoviles.Result> {
        return  await this.createTerminalesMovilesUseCase.create_terminales_moviles(params)
    }
}