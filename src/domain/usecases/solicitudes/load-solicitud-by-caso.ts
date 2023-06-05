import {SolicitudResult} from '@/domain/models'

export interface LoadSolicitudByCaso { 
    load_solicitud_by_caso(caso:LoadSolicitudByCaso.Params):Promise<LoadSolicitudByCaso.Result>
}

export namespace LoadSolicitudByCaso {
    export type Params = {
        caso:string;
        accountId:string;
    }
    export type Result = SolicitudResult[]
}