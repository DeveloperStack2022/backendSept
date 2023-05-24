import {Controller} from '@/presentation/protocols'
import {makeDbExcles} from '@/main/factories/usecases'
import {makeLogControllerDecorator} from '@/main/factories/decorators'
import {LoadExcelController} from '@/presentation/controllers'

export const makeLoadExcelController  = (): Controller => {
    const controller = new LoadExcelController(makeDbExcles())
    return makeLogControllerDecorator(controller)
}