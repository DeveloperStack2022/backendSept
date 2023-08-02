import {Unidad} from '@/domain/models'

export interface UpdateUnidad {
    update_unidad(data:UpdateUnidad.Params):Promise<void>
}

export namespace UpdateUnidad {
    export type Params = Unidad
}