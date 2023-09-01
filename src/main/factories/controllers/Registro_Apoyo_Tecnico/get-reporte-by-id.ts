import { Controller } from "@/presentation/protocols";
import {GetRegistroApoyoTecnicoById} from '@/presentation/controllers'
import {makeLogControllerDecorator,makeGetReporteById} from '@/main/factories'

export const makeGetReporteApoyoTecnicoById = ():Controller => {
    const controller = new GetRegistroApoyoTecnicoById(makeGetReporteById())
    return makeLogControllerDecorator(controller)
} 