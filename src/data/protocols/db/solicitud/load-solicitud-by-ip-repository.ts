import {SolicitudResult} from '@/domain/models'

export interface LoadSolicitudByIpRepository {
    load_solicitud_by_ip(ip:LoadSolicitudByIpRepository.Params):Promise<LoadSolicitudByIpRepository.Result>
}

export namespace LoadSolicitudByIpRepository {
    export type Result = SolicitudResult[]
    export type Params = string;
}