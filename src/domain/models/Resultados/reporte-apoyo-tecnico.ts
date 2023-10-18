export type DataShowTable = {
    nombre_caso:string;
    n_detenidos:string;
    fecha:Date;
    unidad_ejecutoria:string
}
export type DataShowImage = {
    nombre_caso:string;
    ejecutor:string;
    direccion:string;
    latitud:string;
    longitud:string;
    delito:string;
    contexto:string; //TODO: Resumen Caso
    detenidos:number
    indicios: {
        armas?:number;
        celulares?:number
        municiones?:number
    }
}

export type DataResultadosTotales = {
    total_detenidos:number;
    total_armas: number;
    total_dinero:number;
    total_sustancia_ilegales:number; //Total Kg
    total_vehiculos:number;
    total_municiones:number;
    total_terminales_moviles:number
}