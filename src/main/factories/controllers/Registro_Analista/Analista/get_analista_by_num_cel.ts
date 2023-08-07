import { Controller } from "@/presentation/protocols";
import {GetAnalistByNumCedula} from '@/presentation/controllers'

import {makeDbGetAnalistaByNumCl, makeLogControllerDecorator} from '@/main/factories'

export const makeGetAnalistaByNumeroCedulaControllerFactory = ():Controller => {
    const controller = new GetAnalistByNumCedula(makeDbGetAnalistaByNumCl())
    return makeLogControllerDecorator(controller)
}