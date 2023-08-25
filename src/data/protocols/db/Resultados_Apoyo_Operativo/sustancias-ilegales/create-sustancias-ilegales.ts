import {SustanciasIlegales} from '@/domain/models'
export interface CreateSustanciasIlegales {
    create_sustancias_ilegales(params: CreateSustanciasIlegales.Params ):Promise<CreateSustanciasIlegales.Result>
}

export namespace CreateSustanciasIlegales {
    export type  Params = SustanciasIlegales[]
    export type Result = string[]
}