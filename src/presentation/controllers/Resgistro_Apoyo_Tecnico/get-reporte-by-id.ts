import { serverError,ok, noContent } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import {GetReporteApoyoTecnicoById} from '@/domain/usecases'

export class GetRegistroApoyoTecnicoById implements Controller {
    constructor(
        private readonly get_reporteApoyoTecnicoById: GetReporteApoyoTecnicoById
    ){}

    async handle(request: GetRegistroApoyoTecnicoById.Request):Promise<HttpResponse> {
        try {
            const data = await this.get_reporteApoyoTecnicoById.get_reporte_apoyo_tecnico_byId(request.id)
            return data ?  ok(data) : noContent()
        } catch (error) {
            serverError(error)
        }
    }
}

export namespace GetRegistroApoyoTecnicoById {
    export type Request = {
        id:string;
    }
}
