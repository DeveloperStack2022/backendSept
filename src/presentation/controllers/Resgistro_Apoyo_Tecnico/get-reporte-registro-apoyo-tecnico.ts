import { serverError,ok } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import {GetReporteApoyoTecnico} from '@/domain/usecases'

export class GetRegistroApoyoTecnico implements Controller {
    constructor(
        private readonly get_reporteApoyoTecnico: GetReporteApoyoTecnico
    ){}

    async handle(request: any):Promise<HttpResponse> {
        try {
            const data = await this.get_reporteApoyoTecnico.get_reporte_apoyo_tecnico()
            console.log(data)
            return ok({'data':'start'})
        } catch (error) {
            serverError(error)
        }
    }
}

