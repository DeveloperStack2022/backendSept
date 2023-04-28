import { AddSolicitud } from '@/domain/usecases'

export interface AddSolicitudRepository {
  add: (data: AddSolicitudRepository.Params) => Promise<void>
}

export namespace AddSolicitudRepository {
  export type Params = AddSolicitud.Params
}
