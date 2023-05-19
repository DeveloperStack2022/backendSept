import {makeDbLoadSolicitudTestResult, makeLogControllerDecorator} from '@/main/factories'
import {Controller} from '@/presentation/protocols'
import {LoadSolicituTestdResultController} from '@/presentation/controllers'

export const makeLoadSolicitudTestController = ():Controller => {
    const controller = new LoadSolicituTestdResultController(makeDbLoadSolicitudTestResult())
    return makeLogControllerDecorator(controller)
}