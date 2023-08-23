import { Controller, HttpResponse } from "@/presentation/protocols";
import {serverError,ok} from '@/presentation/helpers'

import {DatosGenerales,ResumenCaso,Detenidos,Arma, Vehiculo} from '@/domain/models'
import {CreateDatosGenerales,CreateResumenCaso,CreateDetenido,CreateArmas,CreateVehiculos} from '@/domain/usecases'

export class AddReporteRegistroApoyoTecnico implements Controller {
    constructor(
        private readonly addRegistroApoyoTecnico: CreateDatosGenerales,
        private readonly addResumenCaso: CreateResumenCaso,
        private readonly addDetenido: CreateDetenido,
        private readonly addArmas: CreateArmas,
        private readonly addVehiculo: CreateVehiculos
    ){}

    async handle(request: AddReporteRegistroApoyoTecnico.Request): Promise<HttpResponse>  {
        try {
            const datos = await this.addRegistroApoyoTecnico.create_datos_generales(request.DatosGenerales)
            const datos_resumen_caso = await this.addResumenCaso.create_resumen_caso(request.ResumenCaso)
            const created_detenido = await this.addDetenido.create_detenido(request.Detenido)
            const create_armas = await this.addArmas.create_armas(request.Armas) //Return ['asdasdasd','asdasdasd']
            const create_vehiculos = await this.addVehiculo.create_vehiculos(request.Vehiculos)
            console.log('Created Vehiculos =>',JSON.stringify(create_vehiculos))
            return ok({'data':'created'})
        } catch (error) {
            console.log(error)
            serverError(error)
        }
    }
}

export namespace AddReporteRegistroApoyoTecnico {
    export type Request = {
        DatosGenerales:DatosGenerales,
        ResumenCaso:ResumenCaso
        Detenido: Detenidos,
        Armas: Arma[]
        Vehiculos: Vehiculo[]
    }
}