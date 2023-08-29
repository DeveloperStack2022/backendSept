import {DatosGenerales} from '@/domain/models'

export interface CreateDatosGenerales {
    create_datos_generales(params:CreateDatosGenerales.Params):Promise<CreateDatosGenerales.Result>
}

export namespace CreateDatosGenerales {
    export type Params = DatosGenerales
    export type Result = string
}