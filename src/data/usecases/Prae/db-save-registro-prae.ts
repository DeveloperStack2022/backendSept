import {CreateRegistroPrae} from '@/domain/usecases'
import {AddRegistroPraeRepository} from '@/data/protocols'

export class DbCreateRegistroPrae implements CreateRegistroPrae {
    
    constructor(private readonly addRegistroPrae:AddRegistroPraeRepository){}

    async create_registr(data: CreateRegistroPrae.Params): Promise<CreateRegistroPrae.Result> {
        return await this.addRegistroPrae.add(data)
    }
}