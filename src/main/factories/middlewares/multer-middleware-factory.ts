import { Middleware } from "@/presentation/protocols";
import { MulterMiddleware } from "@/presentation/middlewares";
import {makeDbSaveFile} from '@/main/factories'
export const makeMulterMiddleware = ():Middleware => {
    return new MulterMiddleware(makeDbSaveFile())
}