import { Controller } from "@/presentation/protocols";
import {GenerateExcelController} from '@/presentation/controllers'
import {makeCreateNewWorkBook,makeDbLoadSolicitudesForDate, makeLogControllerDecorator} from '@/main/factories'

export const makeGenerateExcelController = ():Controller => {
    const controller =  new GenerateExcelController(makeCreateNewWorkBook(),makeDbLoadSolicitudesForDate(),makeCreateNewWorkBook(),makeCreateNewWorkBook(),makeCreateNewWorkBook())
    return makeLogControllerDecorator(controller)
}