
export const solicitudSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    hora: {
      type: 'string'
    },
    fecha: {
      type: 'string',
      format: 'date'
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
    solcitante: {
      type: 'object',
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
    },
    accountId: {
      type: 'string'
    }
  }
}
