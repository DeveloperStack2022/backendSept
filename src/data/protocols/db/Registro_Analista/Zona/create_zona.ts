export interface CreateZona {
    create_zona(data:CreateZona.Params):Promise<CreateZona.Result>
}

export namespace CreateZona {
    export type Params = {
        numero_zona:number;
        id_unidad:string;
    }
    export type Result = boolean
}