import { Analista } from "@/domain/models"

export interface Get_analista_by_id {
    get_analista_by_id(id:Get_analista_by_id.Params):Promise<Get_analista_by_id.Result>
}

export namespace Get_analista_by_id {
    export type Params = string 
    export type Result = Analista
}