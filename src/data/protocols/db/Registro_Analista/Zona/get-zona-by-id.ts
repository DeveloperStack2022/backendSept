import {Zona} from '@/domain/models'
export interface GetZonaById {
    get_zona_by_id(id_zona:GetZonaById.Params):Promise<GetZonaById.Result>
}

export namespace GetZonaById {
    export type Params = string;
    export type Result = Zona
}
