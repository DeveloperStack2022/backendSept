export type Dinero = {
    id?:string;
    tipo_divisa: 'pesos colombianos' | 'soles peruanos' | 'dolar americano';
    valor:string;
}