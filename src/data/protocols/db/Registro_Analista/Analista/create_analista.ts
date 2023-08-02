import {Analista} from '@/domain/models'

export interface CreateAnalista {
    create_analista(data:CreateAnalista.Params):Promise<CreateAnalista.Resutl>
}

export namespace CreateAnalista {
    export type Params = Analista
    export type Resutl = {
        create:boolean
    }
}