import { Controller } from "@/presentation/protocols";
import {CreateAnalistaPresentationController} from '@/presentation/controllers'
import {makeDbCreateAnalista, makeLogControllerDecorator,makeDbGetAnalistaByNumCl,makeDbUpdateUnidad} from '@/main/factories'

export const makeCreateAnalistaControllerFactory = ():Controller => {
    const controller = new CreateAnalistaPresentationController(makeDbCreateAnalista(),makeDbGetAnalistaByNumCl(),makeDbUpdateUnidad())
    return makeLogControllerDecorator(controller)
}