import { SolicitudModel } from '@/domain/models'

export interface AddSolicitud {
  add: (data: AddSolicitud.Params) => Promise<void>
}

export namespace AddSolicitud {
  export type Params = Omit<SolicitudModel,'id'>
}
