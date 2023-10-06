export type PraeModel = {
    id:string;
    fecha:Date;
    analista:Analista;
    motivo:string;
    placas?:string[];
    celular?:string[]
    telefono?:string[]
    email?:string[];
    direccion?:string;
    gdo?:string;
    operador:string;
}

type Analista = { 
    numero_cedula:string;
    grado:string;
    nombres:string;
}