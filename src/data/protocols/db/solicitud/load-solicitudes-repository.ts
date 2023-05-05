import {SolicitudModel} from '@/domain/models'

export interface LoadSolicitudesRepository {
    loadAll: (accountId: string) => Promise<LoadSolicitudesRepository.Result>
}

export namespace LoadSolicitudesRepository {
    export type Result = SolicitudModel[]
}