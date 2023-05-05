import {SolicitudModel} from '@/domain/models'

export interface LoadSolicitudes {
    load: (accountId:string) => Promise<LoadSolicitudes.Result>
}

export namespace LoadSolicitudes {
    export type Result = SolicitudModel[]
}