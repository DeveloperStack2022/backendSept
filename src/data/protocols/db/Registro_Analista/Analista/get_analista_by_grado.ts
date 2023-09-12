import {Analista} from '@/domain/models'
export interface GetAnalistaByGrado {
    get_analista_by_grado(params:GetAnalistaByGrado.Parmas):Promise<GetAnalistaByGrado.Result> 
}

export namespace GetAnalistaByGrado {
    export type Parmas = string;
    export type Result = Analista[]
}