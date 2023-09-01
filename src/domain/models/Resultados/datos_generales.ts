export type DatosGenerales =  {
    nombre_caso: string;
    zona:number;
    subzona:string;
    distrito:string;
    direccion:string;
    coordenadas:Cordenas,
    unidad_ejecutoria:string;
    fecha:Date;
    hora:string;
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
    sustancias_sujetas_fiscalizacion?:string[]
}