import {GetResultsByRangTotal} from '@/domain/usecases'
import {GetResultsByRangeDate } from '@/data/protocols'

export class DbGetResultsByRangeDate  implements GetResultsByRangTotal {
    constructor(
        private readonly _getResultsByRange: GetResultsByRangeDate
    ){}
    async get_results_by_rang_total(params: GetResultsByRangTotal.Parmas): Promise<GetResultsByRangTotal.Result> {
        return await this._getResultsByRange.get_results_by_range_date(params)
    }
}