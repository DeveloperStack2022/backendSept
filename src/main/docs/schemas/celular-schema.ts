export const celularSchema = {
    type:'object',
    properties:{
        numero_celular:{
            type:'string'
        },
        imsi:{
            type:'string'
        },
        ip:{
            type:'string',
        },
        id_ubicacion:{
            type:'string'
        }
    },
    required:['numero_celular','imsi','ip','id_ubicacion']
}