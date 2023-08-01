import { Controller } from "@/presentation/protocols";
import {CreateAnalistaPresentationController} from '@/presentation/controllers'
import {makeDbCreateAnalista, makeLogControllerDecorator,makeDbGetAnalistaByNumCl} from '@/main/factories'

export const makeCreateAnalistaControllerFactory = ():Controller => {
    const controller = new CreateAnalistaPresentationController(makeDbCreateAnalista(),makeDbGetAnalistaByNumCl())
    return makeLogControllerDecorator(controller)
}