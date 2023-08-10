import {Unidad} from '@/domain/models'

export interface GetUnidad {
    get_unidad(data:GetUnidad.Params):Promise<GetUnidad.Result>
}

export namespace GetUnidad {
    export type Params = string;
    
    export type Result = Unidad
}