import { forbidden,serverError,ok } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { CheckSolicitudById,LoadSolicitudById } from '@/domain/usecases'
import { Controller,HttpResponse } from '@/presentation/protocols'

export class LoadSolicitudResultController implements Controller {
  constructor (
    private readonly checkSolicitudById: CheckSolicitudById,
    private readonly loadSolicitudById: LoadSolicitudById
  ) {}

  async handle (request: LoadSolicitudResultController.Request): Promise<HttpResponse> {
    try {
      const { solicitudId } = request
      const exists = await this.checkSolicitudById.checkById(solicitudId)
      if (!exists) {
        return forbidden(new InvalidParamError('solicitudId'))
      }
      const solicitud = await this.loadSolicitudById.loadById(solicitudId)
      return ok(solicitud)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSolicitudResultController {
  export type Request = {
    solicitudId: string
  }
}
