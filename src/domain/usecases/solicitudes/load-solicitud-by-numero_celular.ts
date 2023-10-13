import {SolicitudNumero} from '@/domain/models'

export interface Get_Solcitud_By_numero_celular{
    load_solicitud_by_numero_celular(params:Get_Solcitud_By_numero_celular.Params):Promise<Get_Solcitud_By_numero_celular.Response>
}

export namespace Get_Solcitud_By_numero_celular {
    export type Params = {
        numero_celular:string;
    }
    export type Response = SolicitudNumero
}