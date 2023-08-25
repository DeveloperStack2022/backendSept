import { SolicitudModel } from '@/domain/models'

export interface LoadAllSolictudesForDate {
    load_solicitudes_for_date(date_start:Date,date_end:Date):Promise<LoadAllSolictudesForDate.Result>
}

export namespace LoadAllSolictudesForDate {
    export type Result = SolicitudModel[]
}