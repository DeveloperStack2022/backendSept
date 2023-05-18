import { LoadSolicitudes } from '@/domain/usecases'
import { Controller, HttpResponse } from '../protocols'
import { noContent, serverError,ok } from '../helpers'

export class LoadSolicitudesController implements Controller {
  constructor (private readonly loadSolicitudes: LoadSolicitudes) {}

  async handle (request: LoadSolicitudesController.Request): Promise<HttpResponse> {
    let skip:number = parseInt(request.skip as string)
    let limit:number =  parseInt(request.limit as string)
    try {
      const solicitudes = await this.loadSolicitudes.load(request.accountId,skip,limit)
      return solicitudes.length ? ok(solicitudes) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSolicitudesController {
  export type Request = {
    skip:string
    limit:string
    accountId:string
  }
}
