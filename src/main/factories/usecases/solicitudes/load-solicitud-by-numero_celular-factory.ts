import { DbLoadSolicitudByNumerCelular } from "@/data/usecases";
import {Get_Solcitud_By_numero_celular} from "@/domain/usecases";
import {NumeroCelularMongoRepository} from '@/infra/db'

export const makeDbLoadSolicitudByNumeroCelular = ():Get_Solcitud_By_numero_celular => {
    const repositoryNumeroCelular = new NumeroCelularMongoRepository()
    return new DbLoadSolicitudByNumerCelular(repositoryNumeroCelular)
}