import { Controller } from "@/presentation/protocols";
import {LoadSolicitudByNumCelular} from '@/presentation/controllers'
import {makeLogControllerDecorator,makeDbLoadSolicitudByNumCelular} from '@/main/factories'
export const makeLoadSolicitudByNumCelularController = ():Controller  => {
    const controller = new LoadSolicitudByNumCelular(makeDbLoadSolicitudByNumCelular())
    return makeLogControllerDecorator(controller)
}