import { SolicitudMongoRepository } from '@/infra/db'
import { LoadSolicitudes } from '@/domain/usecases'
import { DbLoadSolicitudes } from '@/data/usecases'

export const makeDbLoadSolicitudes = (): LoadSolicitudes => {
  const solicitudMongoRepository = new SolicitudMongoRepository()
  return new DbLoadSolicitudes(solicitudMongoRepository)
}
