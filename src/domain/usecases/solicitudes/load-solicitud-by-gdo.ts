import {SolicitudResult} from '@/domain/models'

export interface LoadSolicitudByGdo { 
    load_solicitud_by_caso(caso:LoadSolicitudByGdo.Params):Promise<LoadSolicitudByGdo.Result>
}

export namespace LoadSolicitudByGdo {
    export type Params = {
        gdo:string;
        accountId:string;
    }
    export type Result = SolicitudResult[]
}