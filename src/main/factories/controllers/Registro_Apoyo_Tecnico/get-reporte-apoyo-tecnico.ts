import {Controller} from '@/presentation/protocols'
import {GetRegistroApoyoTecnico} from '@/presentation/controllers'
import { makeLogControllerDecorator,makeGetReporteApoyoTecnico } from '@/main/factories'

export const makeGetReportesApoyoTecnico = ():Controller => {
    const controller = new GetRegistroApoyoTecnico(makeGetReporteApoyoTecnico())
    return makeLogControllerDecorator(controller)
}