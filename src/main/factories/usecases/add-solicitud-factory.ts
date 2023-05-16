import { AddSolicitud } from '@/domain/usecases'
import { SolicitudMongoRepository } from '@/infra/db'
import { DbAddSolicitud } from '@/data/usecases'

export const makeDbAddSolicitud = (): AddSolicitud => {
  const solicitudMongoRepository = new SolicitudMongoRepository()
  return new DbAddSolicitud(solicitudMongoRepository)
}
