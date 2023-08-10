import {GetUnidad} from '@/domain/usecases'
import { UnidadMongodbRepository } from '@/infra/db'
import {DbGetUnidadByNombre} from '@/data/usecases'
export const makeDbGetUnidadByNombre = ():GetUnidad => {
    const repo = new UnidadMongodbRepository()
    return new DbGetUnidadByNombre(repo)
} 