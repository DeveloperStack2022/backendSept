import {SustanciasIlegales as SustanciasIlegalesModels} from '@/domain/models'
export interface CreateSustanciasIlegales  {
    create_sustancias_ilegales(data: CreateSustanciasIlegales.Params):Promise<CreateSustanciasIlegales.Result>
}


export namespace CreateSustanciasIlegales {
    export type Params = SustanciasIlegalesModels[]
    export type Result = string[]
}

