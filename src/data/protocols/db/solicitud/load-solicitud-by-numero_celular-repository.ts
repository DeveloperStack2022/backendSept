import {SolicitudNumero} from '@/domain/models'

export interface LoadSolicitudByNumeroCelularRepository {
    load_solicitud_numero_celular(params:LoadSolicitudByNumeroCelularRepository.Params):Promise<LoadSolicitudByNumeroCelularRepository.Result>
}

export namespace LoadSolicitudByNumeroCelularRepository {
    export type Params = {
        numero_celular:string;
    }
    export type Result = SolicitudNumero
}