import {Dinero} from '@/domain/models'

export interface CreateDinero {
    create_dinero(data:CreateDinero.Params):Promise<CreateDinero.Result>
}

export namespace CreateDinero {
    export type Params = Dinero[]
    export type Result = string[]
}