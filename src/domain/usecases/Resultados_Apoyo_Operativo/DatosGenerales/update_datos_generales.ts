import {UpdateDatosGeneralesEntity} from '@/domain/models'

export interface UpdateDatosGenerales {
    update_datos_generales(params:UpdateDatosGenerales.Params):Promise<UpdateDatosGenerales.Result>
}

export namespace UpdateDatosGenerales {
    export type Params = UpdateDatosGeneralesEntity
    export type Result = boolean
}