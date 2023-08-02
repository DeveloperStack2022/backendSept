import {UpdateUnidad} from '@/domain/usecases'
import {DbUpdateUnidad} from '@/data/usecases'
import { UnidadMongodbRepository } from '@/infra/db'

export const makeDbUpdateUnidad = ():UpdateUnidad => {
    // Pasamos el Repositorio que esta Entre Infra -> DB 
    const repositoryUnidad = new UnidadMongodbRepository() 
    return new DbUpdateUnidad(repositoryUnidad)
} 