import {Direcciones} from '@/domain/models'
export interface CreateDireccion {
    create_direccion(data:CreateDireccion.Params):Promise<CreateDireccion.Result>
}

export namespace CreateDireccion {
    export type Params = Direcciones
    export type Result = Direcciones
}