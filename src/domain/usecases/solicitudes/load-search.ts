import {SolicitudResult} from '@/domain/models'

export interface LoadSearch {
    load_search(search:LoadSearch.Params):Promise<LoadSearch.Result>
}

export namespace LoadSearch {
    type Search = "CASO" | "GDO" | "NUMCELULAR"

    export type Params = {
        text_search: string;
        type_search: Search;
    }

    export type Result = {
        SolicitudResult:SolicitudResult[]
    }
}