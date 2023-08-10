import { Controller, HttpResponse } from "@/presentation/protocols";
import {GetUnidad as GetUnidadUseCase,GetAnalistaByIdUnidad,GetUnidadWithZona} from '@/domain/usecases'
import { serverError,ok,noContent} from "@/presentation/helpers";

export class GetUnidad implements Controller {
    constructor(
        private readonly getUnidad: GetUnidadUseCase,
        private readonly getAnalista: GetAnalistaByIdUnidad,
        private readonly getUnidadWithZonas: GetUnidadWithZona
    ){}

    async handle(request: GetUnidad.Request): Promise<HttpResponse> {
        try {
            const {nombre_unidad} = request
            const get_unidad = await this.getUnidad.get_unidad(nombre_unidad)
            const get_analista = await this.getAnalista.get_analista_by_id_unidad(get_unidad.id)
            
            if(!get_analista){
                return noContent()
            }
            const zona = await this.getUnidadWithZonas.get_unidad_with_zona(get_unidad.id)
            
            const data_final = {
                unidad:get_unidad.nombre_unidad,
                analistas: get_analista,
                zonas:zona?.zonas
            }
            return data_final ? ok(data_final) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace GetUnidad {
    export type Request = {
        nombre_unidad:string;
    };
}