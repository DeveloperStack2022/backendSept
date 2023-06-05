import { Controller } from "@/presentation/protocols";
import {LoadSolicitudByIpController} from '@/presentation/controllers'
import {makeLogControllerDecorator,makeDbLoadSolicitudByIp} from '@/main/factories'


export const makeLoadSolicitudByIpControllerFactory = ():Controller => {
    const controller = new LoadSolicitudByIpController(makeDbLoadSolicitudByIp())
    return makeLogControllerDecorator(controller)
}