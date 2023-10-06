import {PraeModel} from '@/domain/models'

export interface CreateRegistroPrae {
    create_registr(data: CreateRegistroPrae.Params):Promise<CreateRegistroPrae.Result>
}

export namespace CreateRegistroPrae {
    export type Params = Omit<PraeModel,'id'>
    export type Result = boolean;
}