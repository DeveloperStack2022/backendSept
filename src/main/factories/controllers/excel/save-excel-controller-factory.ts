import { Controller } from "@/presentation/protocols";
import {SaveExcelController} from '@/presentation/controllers'
import {makeDbExcles,makeDbAddManySolicitud, makeLogControllerDecorator} from '@/main/factories'

export const makeSaveExcelController = ():Controller => {
    
    const controller = new SaveExcelController(makeDbAddManySolicitud(),makeDbExcles(),makeDbExcles(),makeDbExcles())
    return makeLogControllerDecorator(controller)
}