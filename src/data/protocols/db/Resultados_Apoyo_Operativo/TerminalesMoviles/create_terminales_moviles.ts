import {EquipoElectronico} from '@/domain/models'
export interface CreateTerminalesMoviles {
    create_terminales_moviles(params:CreateTerminalesMoviles.Params):Promise<CreateTerminalesMoviles.Result>
}

export namespace CreateTerminalesMoviles {
    export type Params = EquipoElectronico[]
    export type Result = string[]
}