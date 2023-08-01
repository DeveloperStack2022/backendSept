import {Analista,Unidad,Zona,Direcciones} from '@/domain/models'
export interface GetAnalista {
    get_analista(id_analista:GetAnalista.Params): Promise<GetAnalista.Result>
}

export namespace GetAnalista {
    export type  Params = {
        id_analista:string;
    }
    export type Result = {
        Analista: Analista
        Unidad:Unidad
        Zona:Zona
        Direccion:Direcciones
    } 
}