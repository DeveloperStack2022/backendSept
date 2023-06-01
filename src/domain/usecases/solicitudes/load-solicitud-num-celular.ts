import {SolicitudNumero} from '@/domain/models'

export interface LoadSolicitudesNumCelular {
    load_solicitudes_num_celular(numero_celular:LoadSolicitudesNumCelular.Params):Promise<LoadSolicitudesNumCelular.Result>
}

export namespace LoadSolicitudesNumCelular {
    export type Result = SolicitudNumero
    export type Params = {
        numeroCelular:string;
        accountId?:string;
    }
}