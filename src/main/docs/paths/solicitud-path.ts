export const solicitudPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Solicitud'],
    summary: 'Api list para todas las solicitudes',
    description: '',
    responses: {
      200: {
        description: 'Exitosa',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/solicitud'
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
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Solicitud'],
    summary: 'API para criar uma enquete',
    description: 'Essa rota só pode ser executada por **administradores**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addSolicitudParamsSchema'
          }
        }
      }
    },
    responses: {
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
