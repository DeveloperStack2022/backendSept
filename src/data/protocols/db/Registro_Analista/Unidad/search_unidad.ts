
export interface SearchUnidad {
    search_unidad(nombre_unidad:SearchUnidad.Params):Promise<SearchUnidad.Result>
}

export namespace SearchUnidad {
    export type Params = {
        nombre_unidad: string;
    }
    export type Result = boolean
}