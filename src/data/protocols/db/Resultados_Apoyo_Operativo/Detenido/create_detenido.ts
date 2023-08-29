import {Detenidos} from '@/domain/models'

export interface CreateDetenido {
    create_detenido(params:CreateDetenido.Params):Promise<CreateDetenido.Result>
}

export namespace CreateDetenido {
    export type Params = Detenidos[]
    export type Result = string[]
}