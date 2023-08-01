import { Controller } from "@/presentation/protocols";
import {GetAnalista} from '@/presentation/controllers'

import {makeDbGetAnalista, makeLogControllerDecorator} from '@/main/factories'

export const makeGetAnalistaControllerFactory = ():Controller => {
    const controller = new GetAnalista(makeDbGetAnalista())
    return makeLogControllerDecorator(controller)
}