export const addSolicitudParamsSchema = {
  type: 'object',
  properties: {
    hora: {
      type: 'string'
    },
    fecha: {
      type: 'string'
    },
    plataforma: {
      type: 'string'
    },
    caso: {
      type: 'string'
    },
    evento: {
      type: 'string'
    },
    organizacion_delicuencial: {
      type: 'string'
    },
    solicitante: {
      $ref: '#/schemas/solicitante'
    },
    celular: {
      type: 'array',
      items: {
        $ref: '#/schemas/celular'
      }
    },
    ubicacion: {
      type: 'array',
      items: {
        $ref: '#/schemas/ubicacion'
      }
    }
  }
}
