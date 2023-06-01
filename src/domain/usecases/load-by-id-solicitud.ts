import { SolicitudResult } from '@/domain/models'

export interface LoadSolicitudById {
  loadById: (idSolicitud: string) => Promise<LoadSolicitudById.Result>
}

export namespace LoadSolicitudById {
  export type Result = SolicitudResult
}
