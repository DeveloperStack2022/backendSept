import { forbidden,serverError,ok } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import {LoadSolicitudResultTest } from '@/domain/usecases'
import { Controller,HttpResponse } from '@/presentation/protocols'

export class LoadSolicituTestdResultController implements Controller {
  constructor (
    private readonly loadSolicitudResultTest:LoadSolicitudResultTest
  ) {}

  async handle (request: LoadSolicituTestdResultController.Request): Promise<HttpResponse> {
    try {
        const {accountId} = request
        const skip:number = parseInt(request.skip as string)
        const limit:number = parseInt(request.limit as string)
        
        const solicitudTest = await this.loadSolicitudResultTest.load(accountId,skip,limit)
        return ok(solicitudTest)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSolicituTestdResultController {
  export type Request = {
    accountId: string
    skip:string
    limit:string
  }
}
