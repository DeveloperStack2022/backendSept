export const SolicitudByPath = {
    get: {
        security:[{
            apiKeyAuth:[]
        }],
        tags:['SolicitudBy'],
        summary:'End Point para verificar solicitudes por numero celular',
        description: '',
        response:{
            200: {
                description: 'Exitoso',
                content: {
                    'application/json':{
                        schema: {
                            $ref: "#/schemas/solcitud_"
                        }
                    }
                }
            },
            204: {
                description: 'Sucesso, mas sem dados para exibir'
            },
            403: {
                $ref: '#/components/forbidden'
            },
            404: {
                $ref: '#/components/notFound'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    }
}