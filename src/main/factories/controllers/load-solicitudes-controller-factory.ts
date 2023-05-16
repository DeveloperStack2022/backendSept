import { Controller } from '@/presentation/protocols'
import { makeDbLoadSolicitudes } from '../usecases'
import { LoadSolicitudesController } from '@/presentation/controllers/load-solicitudes-controller'
import { makeLogControllerDecorator } from '../decorators'

export const makeLoadSolicitudesController = (): Controller => {
  const controller = new LoadSolicitudesController(makeDbLoadSolicitudes())
  return makeLogControllerDecorator(controller)
}
