import {Analista} from '@/domain/models'

export interface GetAnalistaByIdUnidad {
    get_analista_by_id_unidad(id_unidad:GetAnalistaByIdUnidad.Params):Promise<GetAnalistaByIdUnidad.Result>
}

export namespace GetAnalistaByIdUnidad {
    export type Params = string;
    export type Result = Analista[]
}