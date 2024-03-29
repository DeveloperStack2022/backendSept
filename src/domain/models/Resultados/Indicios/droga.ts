export type SustanciasIlegales = {
    tipo:'Marihuana' | 'Cocaina' | 'Heroina' | 'Otros'
    otro_descripcion?:string;
    peso_neto:number;
    medida_peso: 'kg' | 'gr'
    dir_logotipo:string // -> Url del file con el file_name '/uploads/foto_log'
    descripcion_logo:string; 
    dir_marquilla:string; // -> URL del file con el filename 'upload/foto_marquilla'
    descripcion_marquilla:string;
}