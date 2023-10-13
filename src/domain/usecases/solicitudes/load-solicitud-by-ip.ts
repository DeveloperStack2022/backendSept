import {SolicitudResult} from '@/domain/models'

export interface LoadSolicitudByIp { 
    load_solicitud_by_caso(caso:LoadSolicitudByIp.Params):Promise<LoadSolicitudByIp.Result>
}

export namespace LoadSolicitudByIp {
    export type Params = {
        ip:string;
        accountId:string;
    }
    
    export type Result = {
        solicitudes:SolicitudResult[],
        n_documents:number
    }
}