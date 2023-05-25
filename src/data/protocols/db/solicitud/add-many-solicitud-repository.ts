import {AddManySolicitud} from '@/domain/usecases'

export interface AddSolicitudManyRepository { 
    addMany(data: AddManySolicitud.Params[] ):Promise<void>
}

export namespace AddSolicitudManyRepository {
    export type Params = AddManySolicitud.Params
}