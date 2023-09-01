import { GetResultsRangeByDate } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import {makeGetResultsByRangeDate, makeLogControllerDecorator} from '@/main/factories'

export const makeGetResultsByRangeDate_ = ():Controller => {
    const controller = new GetResultsRangeByDate(makeGetResultsByRangeDate())
    return makeLogControllerDecorator(controller)
}