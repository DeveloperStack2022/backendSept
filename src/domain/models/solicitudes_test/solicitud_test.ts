// Domain - Models 
export type SolicitudModelTest = {
    hora:string;
    fecha:Date
    plataforma:string;
    caso:string;
    evento:string;
    organizacion_delicuencial:string;
    solicitante:string;
    accountId:string;
    // Relation
    celulares:CelularesTest[],
    ubicacion:UbicacionTest[]
}

export type CelularesTest = {
    numero_celular:string;
    imsi:string;
    id_ubicacion:string;
    id_solicitud:string;
}

export type UbicacionTest = {
    latitud:string;
    longitud:string;
    id_celular:string;
    id_solicitud:string;
}

