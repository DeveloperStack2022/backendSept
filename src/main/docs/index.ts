import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Architecture By.Luis Zapata',
    version: '1.0.0'
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Enquete',
    description: 'APIs relacionadas a Enquete'
  },
  {
    name: 'Solicitud',
    description: 'APIs relacionadas a Solicitud'
  }],
  paths,
  schemas,
  components
}
