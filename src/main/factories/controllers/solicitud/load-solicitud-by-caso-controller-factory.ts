import { Controller } from "@/presentation/protocols";
import {LoadSolicitudByCasoController} from '@/presentation/controllers'
import {makeLogControllerDecorator,makeDbLoadSolicitudByCasoFactory} from '@/main/factories'

export const makeLoadSolicitudByCasoControllerFactory = (): Controller  => {
    const controller = new LoadSolicitudByCasoController(makeDbLoadSolicitudByCasoFactory())
    return makeLogControllerDecorator(controller)
}