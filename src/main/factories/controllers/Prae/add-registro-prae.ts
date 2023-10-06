import {CreateRegistroPraePresentationController} from '@/presentation/controllers'
import {Controller} from '@/presentation/protocols'
import {makeDbRegistroPrae, makeLogControllerDecorator} from '@/main/factories'

export const makeAddRegistroPraeController = ():Controller => {
    const controller = new  CreateRegistroPraePresentationController(makeDbRegistroPrae())
    return makeLogControllerDecorator(controller)
}