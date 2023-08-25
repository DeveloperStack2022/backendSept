import { Controller } from "@/presentation/protocols";
import {AddReporteRegistroApoyoTecnico} from '@/presentation/controllers'
import {makeAddReporteApoyoTecnico,makeAddDetenid,makeAddResumenCaso,makeLogControllerDecorator,makeAddArmas,makeAddVehiculos, makeAddDinero,makeAddSustanciasIlegales} from '@/main/factories'

export const makeAddRegistroApoyoTecnico = ():Controller => {
    const controller = new AddReporteRegistroApoyoTecnico(makeAddReporteApoyoTecnico(),makeAddResumenCaso(),makeAddDetenid(),makeAddArmas(),makeAddVehiculos(),makeAddDinero(),makeAddSustanciasIlegales())
    return makeLogControllerDecorator(controller)
}