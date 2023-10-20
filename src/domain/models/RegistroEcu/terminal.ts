export interface Terminal {
    operadora:string;
    numero_celular:string;
    identificacion_ruc:string
    propietario:string;
    localizacion:Localizacion[]
}

export interface Localizacion {
    latitud_terminal:string;
    longitud_terminal:string;
    direccion_aprox_terminal:string;
}