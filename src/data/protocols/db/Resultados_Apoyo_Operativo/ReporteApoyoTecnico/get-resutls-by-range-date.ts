import {DataResultadosTotales} from '@/domain/models'
export interface GetResultsByRangeDate {
    get_results_by_range_date(params:GetResultsByRangeDate.Params):Promise<GetResultsByRangeDate.Result>
}
export namespace GetResultsByRangeDate {
    export type Params = {
        date_start:Date,
        date_end:Date
    } 
    export type Result = DataResultadosTotales
}