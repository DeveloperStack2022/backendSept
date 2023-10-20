import {CreateRegistroEcu} from '@/domain/usecases'
import {CreateRegistroEcuRepository} from '@/data/protocols'

export class DbCreateRegistroEcu implements CreateRegistroEcu {
    constructor(
        private readonly createRegistroEcuRepository:CreateRegistroEcuRepository
    ){}

    async create_registro(params: CreateRegistroEcu.Params): Promise<string> {
        return this.createRegistroEcuRepository.create_registro(params)
    }   
}