export interface UpdateDireccion {
    update_direccion(id_direccion:UpdateDireccion.Params):Promise<void>
}

export namespace UpdateDireccion {
    export type Params = {
        id?:string;
        id_unidad:string;
    }
}