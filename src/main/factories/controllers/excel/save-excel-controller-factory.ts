import { Controller } from "@/presentation/protocols";
import {SaveExcelController} from '@/presentation/controllers'
import {makeDbExcles,makeDbAddSolicitud, makeLogControllerDecorator} from '@/main/factories'

export const makeSaveExcelController = ():Controller => {
    const controller = new SaveExcelController(makeDbAddSolicitud(),makeDbExcles())
    return makeLogControllerDecorator(controller)
}