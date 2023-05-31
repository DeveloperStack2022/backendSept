import {SolicitudNumero} from '@/domain/models'

export interface LoadSolicitudesNumCelular {
    load_solicitudes_num_celular(numero_celular:string):Promise<LoadSolicitudesNumCelular.Result>
}

export namespace LoadSolicitudesNumCelular {
    export type Result = SolicitudNumero[]
}