import {DatosGenerales} from '@/domain/models'
export interface CreateDatosGenerales {
    create_datos_generales(params:DatosGenerales):Promise<any>
}

export namespace CreateDatosGenerales {
    export type Params = DatosGenerales
    export type Result = any
} 