import { SolicitudModel } from '@/domain/models'

export interface LoadSolicitudResult {
  loadById: (solicitudId: string) => Promise<LoadSolicitudResult.Resilt>
}

export namespace LoadSolicitudResult {
  export type Resilt = SolicitudModel
}
