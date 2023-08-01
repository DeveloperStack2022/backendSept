import {SolicitudNumero} from '@/domain/models'

export interface LoadSolicitudesNumeroCelularRepositoryI {
    load_solicitudes_numero_celular(num_celular:string):Promise<LoadSolicitudesNumeroCelularRepositoryI.Result>
}

export namespace LoadSolicitudesNumeroCelularRepositoryI {
    export type Params = string;
    export type Result =  SolicitudNumero[]
}