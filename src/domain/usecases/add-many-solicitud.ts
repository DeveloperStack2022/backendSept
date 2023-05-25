import {SolicitudModel} from '@/domain/models'

export interface AddManySolicitud {
    addMany(data:AddManySolicitud.Params[]):Promise<void>
}

export namespace AddManySolicitud {
    export type Params = Omit<SolicitudModel,'id'>
}