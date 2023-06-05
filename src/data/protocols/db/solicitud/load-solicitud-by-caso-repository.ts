import {SolicitudResult} from '@/domain/models'

export interface LoadsolicitudByCasoRepository {
    load_solicitud_by_caso(caso:LoadsolicitudByCasoRepository.Params): Promise<LoadsolicitudByCasoRepository.Result>
}

export namespace LoadsolicitudByCasoRepository {
    export type Result = SolicitudResult[]
    export type Params = string;
}