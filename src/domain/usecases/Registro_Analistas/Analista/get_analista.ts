// Import Domain 
import {Analista,Direcciones,Unidad,Zona} from '@/domain/models/Registro_Analistas'

export interface Get_Analista {
    get_analista(id_analista:Get_Analista.Params):Promise<Get_Analista.Result>
}

export namespace Get_Analista {
    export type Params = {
        id_analista:string;
    }
    
    export type Result = {
        Analista: Analista
        Direccion: Direcciones
        Unidad: Unidad,
        Zona:Zona
    }
}