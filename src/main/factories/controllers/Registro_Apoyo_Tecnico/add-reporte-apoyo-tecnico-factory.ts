import { Controller } from "@/presentation/protocols";
import {AddReporteRegistroApoyoTecnico} from '@/presentation/controllers'
import {makeAddReporteApoyoTecnico,makeAddDetenid,makeAddResumenCaso,makeLogControllerDecorator} from '@/main/factories'

export const makeAddRegistroApoyoTecnico = ():Controller => {
    const controller = new AddReporteRegistroApoyoTecnico(makeAddReporteApoyoTecnico(),makeAddResumenCaso(),makeAddDetenid())
    return makeLogControllerDecorator(controller)
}