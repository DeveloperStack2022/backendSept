import {Zona} from '@/domain/models'
export interface UpdateZona {
    update_zona(zona:UpdateZona.Params):Promise<UpdateZona.Result>
}

export namespace UpdateZona {
    export type Params = Zona
    export type Result = Zona
}