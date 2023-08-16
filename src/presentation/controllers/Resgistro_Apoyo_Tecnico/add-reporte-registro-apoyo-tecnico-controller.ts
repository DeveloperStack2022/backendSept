import { Controller, HttpResponse } from "@/presentation/protocols";
import {serverError,ok} from '@/presentation/helpers'

import {DatosGenerales,ResumenCaso,Detenidos} from '@/domain/models'
import {CreateDatosGenerales,CreateResumenCaso,CreateDetenido} from '@/domain/usecases'

export class AddReporteRegistroApoyoTecnico implements Controller {
    constructor(
        private readonly addRegistroApoyoTecnico: CreateDatosGenerales,
        private readonly addResumenCaso: CreateResumenCaso,
        private readonly addDetenido: CreateDetenido
    ){}

    async handle(request: AddReporteRegistroApoyoTecnico.Request): Promise<HttpResponse>  {
        console.log(request)
        try {
            const datos = await this.addRegistroApoyoTecnico.create_datos_generales(request.DatosGenerales)
            const datos_resumen_caso = await this.addResumenCaso.create_resumen_caso(request.ResumenCaso)
            const created_detenido = await this.addDetenido.create_detenido(request.Detenido)

            return ok({'data':'test'})
        } catch (error) {
            serverError(error)
        }
    }
}

export namespace AddReporteRegistroApoyoTecnico {
    export type Request = {
        DatosGenerales:DatosGenerales,
        ResumenCaso:ResumenCaso
        Detenido: Detenidos
    }
}