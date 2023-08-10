import { Controller } from "@/presentation/protocols";
import {GetUnidad} from '@/presentation/controllers'
import { makeLogControllerDecorator } from "@/main/factories/decorators";
import {makeDbGetUnidadByNombre,makeDbGetAnalistaById,makeDbGetUnidadWithZonas} from '@/main/factories'


export const makeGetUnidadByNombreUnidad = (): Controller => {

    const controller = new GetUnidad(makeDbGetUnidadByNombre(),makeDbGetAnalistaById(),makeDbGetUnidadWithZonas()) //,makeDbGetZonaById()
    return makeLogControllerDecorator(controller)
} 