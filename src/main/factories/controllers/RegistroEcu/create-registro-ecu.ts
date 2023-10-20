import { CreateRegistroEcuPresentationController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeLogControllerDecorator } from "../../decorators";
import { makeCreateRegistroEcuFactory} from '@/main/factories'

export const makeRegistroEcu = ():Controller => {
    const controller = new CreateRegistroEcuPresentationController(makeCreateRegistroEcuFactory())
    return makeLogControllerDecorator(controller)
}