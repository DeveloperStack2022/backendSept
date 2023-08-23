import {Arma} from '@/domain/models'
export interface CreateArmas {
    create_armas(params: CreateArmas.Params[] ):Promise<CreateArmas.Result>
}

export namespace CreateArmas {
    export type Params = Omit<Arma,'id'>
    export type Result = string[]
}