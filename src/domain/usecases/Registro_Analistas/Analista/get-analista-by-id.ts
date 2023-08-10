// Import Domain 
import {Analista} from '@/domain/models/Registro_Analistas'

export interface Get_Analista_by_id {
    get_analista(id_analista:Get_Analista_by_id.Params):Promise<Get_Analista_by_id.Result>
}

export namespace Get_Analista_by_id {
    export type Params = string
    
    export type Result = Analista
        
}