export type DatosGenerales =  {
    numero_caso: string;
    zona:number;
    subzona:string;
    distrito:string;
    direccion:string;
    coordenadas:Cordenas,
    unidad_ejecutoria:string;
    fecha:any;
    hora:string;
}

type Cordenas = {
    latitud:string;
    longitud:string;
}