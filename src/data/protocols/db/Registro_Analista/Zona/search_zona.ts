
export interface SearchZona {
    search_zona(nombre_zona:SearchZona.Params):Promise<SearchZona.Result>
}

export namespace SearchZona {
    export type Params = {
        numero_zona:number;
    }

    export type Result = boolean
}