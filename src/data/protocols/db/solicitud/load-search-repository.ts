import {SolicitudResult} from '@/domain/models'

export interface LoadSearch {
    load_search(text_search:LoadSearch.Params):Promise<LoadSearch.Result>
}

export namespace LoadSearch {
    export type Result = {
        SolicitudResult:SolicitudResult[]
    }
    export type Params = string
}