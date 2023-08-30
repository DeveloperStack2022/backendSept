import { serverError,ok, noContent } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import {GetReporteApoyoTecnico} from '@/domain/usecases'

export class GetRegistroApoyoTecnico implements Controller {
    constructor(
        private readonly get_reporteApoyoTecnico: GetReporteApoyoTecnico
    ){}

    async handle(request: any):Promise<HttpResponse> {
        try {
            const data = await this.get_reporteApoyoTecnico.get_reporte_apoyo_tecnico()
            return data.length > 0 ?  ok(data) : noContent()
        } catch (error) {
            serverError(error)
        }
    }
}

