import { LoadSolicitudes } from '@/domain/usecases'
import { Controller, HttpResponse } from '../protocols'
import { noContent, serverError,ok } from '../helpers'

export class LoadSolicitudesController implements Controller {
  constructor (private readonly loadSolicitudes: LoadSolicitudes) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const solicitudes = await this.loadSolicitudes.load(request.accountId)
      return solicitudes.length ? ok(solicitudes) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
