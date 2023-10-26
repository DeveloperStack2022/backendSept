import {EquipoElectronico} from '@/domain/models'
export interface CreateTerminalesMoviles {
    create_terminales_moviles(params:CreateTerminalesMoviles.Request):Promise<CreateTerminalesMoviles.Result>
}

export namespace CreateTerminalesMoviles {
    export type Request = EquipoElectronico[]
    export type Result = string[]
}