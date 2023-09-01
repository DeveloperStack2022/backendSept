import {DataResultadosTotales} from '@/domain/models'

export interface GetResultsByRangTotal {
    get_results_by_rang_total(params:GetResultsByRangTotal.Parmas):Promise<GetResultsByRangTotal.Result>
}

export namespace GetResultsByRangTotal {
    export type Parmas = {
        date_start:Date,
        date_end:Date
    }
    export type Result = DataResultadosTotales
} 