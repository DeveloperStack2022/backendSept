import { Controller, HttpResponse } from "@/presentation/protocols";
import {GetResultsByRangTotal} from '@/domain/usecases'
import { noContent, serverError,ok } from "@/presentation/helpers";

export class GetResultsRangeByDate implements Controller {
    constructor(
        private readonly get_results_by_range_date:  GetResultsByRangTotal
    ){}

    async handle(request: GetResultsRangeByDate.Request):Promise<HttpResponse> {
        try {
            const data = await this.get_results_by_range_date.get_results_by_rang_total({date_start:new Date(request.date_start),date_end:new Date(request.date_end)})
            return data ? ok(data) : noContent()
        } catch (error) {
            console.log(error)
            serverError(error)
        }
    }
}

export namespace GetResultsRangeByDate {
    export type Request = {
        date_start:Date,
        date_end:Date
    }
}