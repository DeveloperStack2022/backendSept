import {Analista,Zona,Unidad,Direcciones} from '@/domain/models'

export interface CreateAnalista {
    create_analista(data:CreateAnalista.Params):Promise<CreateAnalista.Result>
}

export namespace CreateAnalista {
    export type Params = {
        Analista:Analista
        Direcciones:Direcciones
        Unidad:Unidad
        Zona:Zona
    }
    
    export type Result = {
        create:boolean
    }
}