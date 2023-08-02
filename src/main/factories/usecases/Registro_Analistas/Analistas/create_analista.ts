import { DbCreateAnalista } from '@/data/usecases'
import {CreateAnalista} from '@/domain/usecases'
import { AnalistaMongoDbRepository,DireccionMongodbRepository,UnidadMongodbRepository, ZonaMongodbRepository } from '@/infra/db'

export const makeDbCreateAnalista = ():CreateAnalista => {
    const repositoryAnalista = new AnalistaMongoDbRepository()
    const repositoryDireccion = new DireccionMongodbRepository()
    const repositoryUnidad = new UnidadMongodbRepository()
    const repositoryZona = new ZonaMongodbRepository()
    
    return new DbCreateAnalista(repositoryAnalista,repositoryDireccion,repositoryDireccion,repositoryDireccion,repositoryUnidad,repositoryUnidad,repositoryZona,repositoryZona,repositoryZona)
}