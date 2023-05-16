import { SolicitudMongoRepository } from '@/infra/db'
import { CheckSolicitudById } from '@/domain/usecases'
import { DbCheckSolicitudById } from '@/data/usecases'

export const makeDbCheckSolicitudById = (): CheckSolicitudById => {
  const solicitudMongoRepository = new SolicitudMongoRepository()
  return new DbCheckSolicitudById(solicitudMongoRepository)
}
