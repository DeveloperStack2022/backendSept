import { serverError,ok, noContent } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import {GetReporteApoyoTecnico} from '@/domain/usecases'

export class GetRegistroApoyoTecnico implements Controller {
    constructor(
        private readonly get_reporteApoyoTecnico: GetReporteApoyoTecnico
    ){}

    async handle(request: GetRegistroApoyoTecnico.Request):Promise<HttpResponse> {
        try {
            // console.log(request)
            const data = await this.get_reporteApoyoTecnico.get_reporte_apoyo_tecnico({limit:parseInt(request.limit),skip:parseInt(request.skip)})
            return data.DataShowTable.length > 0 ?  ok(data) : noContent()
        } catch (error) {
            serverError(error)
        }
    }
}

export namespace GetRegistroApoyoTecnico {
    export type Request = {
        skip:string;
        limit:string;
    }
}

