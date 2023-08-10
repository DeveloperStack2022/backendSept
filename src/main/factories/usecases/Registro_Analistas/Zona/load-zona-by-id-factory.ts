import {GetZonaById} from '@/domain/usecases'
import { ZonaMongodbRepository } from '@/infra/db'
import {DbGetZonaById} from '@/data/usecases'

export const  makeDbGetZonaById = () :GetZonaById => {
    const repo = new ZonaMongodbRepository()
    return new DbGetZonaById(repo)
}