import {Direcciones} from '@/domain/models'
export interface SearchDireccion {
    search_direccion(nombre_direccion:SearchDireccion.Params ):Promise<SearchDireccion.Result>
}

export namespace SearchDireccion {
    export type Params = {
        nombre_direccion:string;
    }
    export type Result = Direcciones
}