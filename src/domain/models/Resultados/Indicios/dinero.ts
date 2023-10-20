export type Dinero = {
    id?:string;
    tipo_divisa: 'pesos colombianos' | 'soles peruanos' | 'dolar americano';
    valor_total:string;
    valor_total_int?:number;
}