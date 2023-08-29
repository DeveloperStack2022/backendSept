import {ResumenCaso} from '@/domain/models'
export interface CreateResumenCaso {
    create_resumen_caso(params:CreateResumenCaso.Params):Promise<any>
}

export namespace CreateResumenCaso {
    export type Params = ResumenCaso
    export type Result = string
} 