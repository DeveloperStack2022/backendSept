import { DbCreateDetenido } from "@/data/usecases";
import { CreateDetenido } from "@/domain/usecases";
import {DetenidoMongoRepository} from '@/infra/db'

export const makeAddDetenid = (): CreateDetenido => {
    const createDetenido = new DetenidoMongoRepository()
    return new DbCreateDetenido(createDetenido)
    
}