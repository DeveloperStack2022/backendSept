import { SolicitudModel } from '@/domain/models'

export interface LoadSolicitudResult {
  load: (idSolicitud: string) => Promise<LoadSolicitudResult.Result>
}

export namespace LoadSolicitudResult {
  export type Result = SolicitudModel
}
