export const ubicacionSchema = {
  type: 'object',
  properties: {
    lalitud: {
      type: 'string'
    },
    longitud: {
      type: 'string'
    }
  },
  required: ['lalitud','longitud']
}
