import { Middleware } from "@/presentation/protocols";
import { MulterMiddleware } from "@/presentation/middlewares";
import {makeDbSaveFile} from '@/main/factories'
export const makeMulterMiddleware = (fieldName:string):Middleware => {
    return new MulterMiddleware(makeDbSaveFile())
}