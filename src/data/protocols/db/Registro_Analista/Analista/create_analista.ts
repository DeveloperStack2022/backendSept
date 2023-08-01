import {Analista,Unidad,Zona,Direcciones} from '@/domain/models'

export interface CreateAnalista {
    create_analista(data:CreateAnalista.Params):Promise<CreateAnalista.Resutl>
}

export namespace CreateAnalista {
    export type Params = {
        Analista: Analista
        Unidad:Unidad
        Zona:Zona
        Direcciones:Direcciones
    }
    export type Resutl = {
        create:boolean
    }
}