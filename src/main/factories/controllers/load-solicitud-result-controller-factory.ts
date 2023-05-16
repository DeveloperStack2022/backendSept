import { makeLogControllerDecorator,makeDbCheckSolicitudById,makeDbLoadSolicitudResult } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadSolicitudResultController } from '@/presentation/controllers'

export const makeLoadSolicitudResultController = (): Controller => {
  const controller = new LoadSolicitudResultController(makeDbCheckSolicitudById(),makeDbLoadSolicitudResult())
  return makeLogControllerDecorator(controller)
}
