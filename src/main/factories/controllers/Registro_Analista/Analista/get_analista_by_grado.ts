import { Controller } from "@/presentation/protocols";
import {GetAnalistByGrado} from '@/presentation/controllers'

import {makeGetAnalistaByGrado, makeLogControllerDecorator} from '@/main/factories'

export const makeGetAnalistaByGradoControllerFactory = ():Controller => {
    const controller = new GetAnalistByGrado(makeGetAnalistaByGrado())
    return makeLogControllerDecorator(controller)
}