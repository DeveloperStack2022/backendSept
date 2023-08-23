export type Arma = {
    id?:string
    tipo_arma:'Fuego' | 'Blanca'
    logitud_arma_fuego?:'Larga' | 'Corta'
    tipo_arma_fuego?:'Industrial' | 'Artesanal' | 'Mixta'
    tipo_arma_blanca?: 'Artesanal' | 'Comercial'
    cantidad:number
    calibre_arma_fuego?:string;
}