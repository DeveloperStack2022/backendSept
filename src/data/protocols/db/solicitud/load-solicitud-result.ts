import { SolicitudModel } from '@/domain/models'

export interface LoadSolicitudRepository {
  load: (idSolicitud: string) => Promise<LoadSolicitudRepository.Result>
}

export namespace LoadSolicitudRepository {
  export type Result = SolicitudModel
}
