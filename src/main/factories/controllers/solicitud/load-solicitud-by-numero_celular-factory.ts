import {Controller} from '@/presentation/protocols'
import {LoadSolicitudByNumeroCelularController} from '@/presentation/controllers'
import {makeLogControllerDecorator,makeDbLoadSolicitudByNumeroCelular} from '@/main/factories'

export const makeLoadSolicitudByNumeroCelularFactory = ():Controller => {
    const controller = new LoadSolicitudByNumeroCelularController(makeDbLoadSolicitudByNumeroCelular())
    return makeLogControllerDecorator(controller)
}