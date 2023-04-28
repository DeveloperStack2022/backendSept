export const solicitanteSchema = {
    type:'object',
    properties:{
        grado:{
            type:'string'
        },
        nombres_completos:{
            type:'string'
        },
        unidad:{
            type:'string',
        },
        zona:{
            type:'string'
        }
    },
    required:['grado','nombres_completos']
}