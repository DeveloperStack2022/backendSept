import { SolicitudResult } from '@/domain/models'

export interface LoadSolicitudByIdRepository {
  loadById: (idSolicitud: string) => Promise<LoadSolicitudByIdRepository.Result>
}

export namespace LoadSolicitudByIdRepository {
  export type Result = SolicitudResult
}
