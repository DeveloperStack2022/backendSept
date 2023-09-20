export type DatosGenerales =  {
    nombre_caso: string;
    zona:number;
    subzona:string;
    distrito:string;
    direccion:string;
    coordenadas:Cordenas,
    unidad_ejecutoria:string;
    unidad_apoyo:string;
    fecha:Date;
    hora:string;
    numero_reporte:number;
    image_anexo?:string;
}

type Cordenas = {
    latitud:string;
    longitud:string;
}

export type UpdateDatosGeneralesEntity = {
    datosGenerales?: string;
    resumenCaso?:string;
    detenidos?:string[]
    vehiculo?:string[]
    armas?:string[]
    dinero?:string[]
    municiones?:string[]
    sustancias_sujetas_fiscalizacion?:string[]
}