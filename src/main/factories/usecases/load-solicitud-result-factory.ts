import { LoadSolicitudResult } from '@/domain/usecases'
import { DbLoadSolicitudById } from '@/data/usecases'
import { SolicitudMongoRepository } from '@/infra/db'

export const makeDbLoadSolicitudResult = (): LoadSolicitudResult => {
  const solicitudResultMongoRepository = new SolicitudMongoRepository()
  return new DbLoadSolicitudById(solicitudResultMongoRepository)
}
