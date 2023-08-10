import {GetUnidadWithZona} from '@/domain/usecases'
import {UnidadMongodbRepository} from '@/infra/db'
import {DbGetUnidadWithZonas} from '@/data/usecases'

export const makeDbGetUnidadWithZonas = (): GetUnidadWithZona => {
    const repo = new UnidadMongodbRepository()
    return new DbGetUnidadWithZonas(repo)
}