import {DbAddSolicitud} from '@/data/usecases'
import {makeDbAddSolicitud,makeAddSolicitudValidation, makeLogControllerDecorator} from '@/main/factories'
import {Controller} from '@/presentation/protocols'
import {AddSolicitudController} from '@/presentation/controllers'

export const makeAddSolicitudController = (): Controller => {
    const controller = new AddSolicitudController(makeAddSolicitudValidation(),makeDbAddSolicitud())
    return makeLogControllerDecorator(controller)
}