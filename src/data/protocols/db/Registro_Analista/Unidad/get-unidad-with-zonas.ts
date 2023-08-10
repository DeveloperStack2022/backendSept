import { Zona } from "@/domain/models";

export interface GetUnidadWithZonas {
    get_unidad_with_zonas(id_unidad:GetUnidadWithZonas.Params): Promise<GetUnidadWithZonas.Result>
}

export namespace GetUnidadWithZonas {
    export type Params = string;
    export type Result = {
        id:string;
        zonas:Zona[]
    }
}