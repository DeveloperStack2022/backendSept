export interface GetAnalistaByGrado {
    get_analista_by_grado(params:GetAnalistaByGrado.Params ):Promise<GetAnalistaByGrado.Result>
}
export namespace GetAnalistaByGrado {
    export type  Params = string; 
    export type Result = {}
}