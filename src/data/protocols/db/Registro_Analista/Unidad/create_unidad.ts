import {Unidad} from '@/domain/models'

export interface CreateUnidad {
    create_unidad(data:CreateUnidad.Params):Promise<CreateUnidad.Result>
}

export namespace CreateUnidad {
    export type Params = Unidad
    export type Result = Unidad
}