import { SolicitudModel } from '@/domain/models'

export interface LoadSolicitudRepository {
  load: (idSolicitud: string,skip:number,limit:number) => Promise<LoadSolicitudRepository.Result>
}

export namespace LoadSolicitudRepository {
  export type Result = SolicitudModel
}
