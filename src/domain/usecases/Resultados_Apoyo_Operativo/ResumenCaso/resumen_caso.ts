import {ResumenCaso} from '@/domain/models'

export interface CreateResumenCaso {
    create_resumen_caso(params: CreateResumenCaso.Params):Promise<CreateResumenCaso.Result>
}

export namespace CreateResumenCaso {
    export type Params = ResumenCaso
    export type Result = any
}