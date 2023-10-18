import {Controller} from '@/presentation/protocols'
import {LoadSolicitudByNumeroCelularController} from '@/presentation/controllers'
import {makeLogControllerDecorator,makeDbLoadSolicitudByNumeroCelular,makeDbLoadSolicitanteById} from '@/main/factories'

export const makeLoadSolicitudByNumeroCelularFactory = ():Controller => {
    const controller = new LoadSolicitudByNumeroCelularController(makeDbLoadSolicitudByNumeroCelular(),makeDbLoadSolicitanteById())
    return makeLogControllerDecorator(controller)
}