import {Controller} from '@/presentation/protocols'
import {GetAnalistasByUnidad} from '@/presentation/controllers'
import {makeLogControllerDecorator,makeGetAnalistasByUnidad,makeDbGetUnidadByNombre} from '@/main/factories'

export const makeGetAnalistaByUnidadControllerFactory = ():Controller => {
    const controller = new GetAnalistasByUnidad(makeDbGetUnidadByNombre(),makeGetAnalistasByUnidad())
    return makeLogControllerDecorator(controller)
}