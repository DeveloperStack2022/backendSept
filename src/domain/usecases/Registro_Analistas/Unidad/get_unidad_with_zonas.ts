import { Zona } from "@/domain/models";

export interface GetUnidadWithZona {
    get_unidad_with_zona(id_unidad:GetUnidadWithZona.Params):Promise<GetUnidadWithZona.Result>
}

export namespace GetUnidadWithZona {
    export type Params = string;
    export type Result = {
        id: string;
        zonas: Zona[]
    }
}