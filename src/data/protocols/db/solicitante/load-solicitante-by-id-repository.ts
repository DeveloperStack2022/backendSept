import {Solicitante} from '@/domain/models'
import { ObjectId } from 'mongodb'

export interface LoadSolicitanteById {
    load_solicitante_by_id(params:LoadSolicitanteById.Params):Promise<LoadSolicitanteById.Result>
}

export namespace LoadSolicitanteById {
    export type Params = {
        id_solicitante: ObjectId
    } 
    export type Result = Solicitante
}