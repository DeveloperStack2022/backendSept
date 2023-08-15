import { Controller, HttpResponse } from "@/presentation/protocols";
import {CreateDatosGenerales} from '@/domain/usecases'
import {serverError,ok} from '@/presentation/helpers'

import {DatosGenerales} from '@/domain/models'

export class AddReporteRegistroApoyoTecnico implements Controller {
    constructor(
        private readonly addRegistroApoyoTecnico: CreateDatosGenerales
    ){}

    async handle(request: AddReporteRegistroApoyoTecnico.Request): Promise<HttpResponse>  {
        console.log(request)
        try {
            const datos = await this.addRegistroApoyoTecnico.create_datos_generales(request.DatosGenerales)
            console.log(datos)
            return ok({'data':'test'})
        } catch (error) {
            serverError(error)
        }
    }
}

export namespace AddReporteRegistroApoyoTecnico {
    export type Request = {
        DatosGenerales:DatosGenerales
    }
}