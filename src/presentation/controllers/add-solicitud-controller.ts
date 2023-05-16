import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { AddSolicitud } from '@/domain/usecases'

export class AddSolicitudController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSolicitud: AddSolicitud
  ) {}

  async handle (request: AddSolicitud.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.addSolicitud.add({
        ...request,
        fecha: new Date()
      })
      return noContent()
    } catch (err) {
      return serverError(err)
    }
  }
}

export namespace AddSolicitudController {
  export type Request = {
    hora: string
    fecha: Date
    plataforma: string
    caso?: string
    evento?: string
    organizacion_delicuencia?: string
    // Relaciones
    solicitante: Solicitante
    celular: Celular[]
    ubicacion: Ubicacion[]
  }

    type Solicitante = {
      grado: string
      nombres_completos: string
      unidad?: string
      zona?: string
    }

    type Celular = {
      numero_celular: string
      imsi: string
      ip: string
    }

    type Ubicacion = {
      latitud: string
      longitud: string
    }

}
