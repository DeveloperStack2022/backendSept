import { Controller } from "@/presentation/protocols";
import {AddReporteRegistroApoyoTecnico} from '@/presentation/controllers'
import {makeAddReporteApoyoTecnico, makeLogControllerDecorator} from '@/main/factories'

export const makeAddRegistroApoyoTecnico = ():Controller => {
    const controller = new AddReporteRegistroApoyoTecnico(makeAddReporteApoyoTecnico())
    return makeLogControllerDecorator(controller)
}