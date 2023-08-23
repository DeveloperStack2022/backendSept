export type Vehiculo = {
    id?:string
    tipo: 'carro' | "motocicleta" | "avioneta" | "lancha"
    marca: string;
    modelo:string;
    placa:string;
}