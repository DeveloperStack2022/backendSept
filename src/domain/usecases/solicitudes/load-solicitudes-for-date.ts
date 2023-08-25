import {SolicitudModel} from '@/domain/models'
export interface LoadSolicitudesForDate {
    load_solicitudes_for_date(data:LoadSolicitudesForDate.Params):Promise<unknown[]>
}

export namespace LoadSolicitudesForDate {
    export type Params = {
        start_date: Date;
        end_date: Date
    }
    
}