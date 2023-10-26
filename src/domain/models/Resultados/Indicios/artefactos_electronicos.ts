export type EquipoElectronico = {
    tipo: 'Celular' | 'Computadora' | 'Tablet'
    cantidad:number
    marca:string;
    modelo:string;
    imei:string;
    numero_cel?:string;
}