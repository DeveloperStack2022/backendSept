export interface UpdateUnidad {
    update_unidad(data:UpdateUnidad.Params):Promise<void>
}

export namespace UpdateUnidad {
    export type Params = {
        id?:string;
        id_direccion:string;
        id_zonas:string;
    }
}