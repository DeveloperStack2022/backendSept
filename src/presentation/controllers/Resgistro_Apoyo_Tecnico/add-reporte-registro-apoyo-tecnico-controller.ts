import { Controller, HttpResponse } from "@/presentation/protocols";
import {serverError,ok} from '@/presentation/helpers'

import {DatosGenerales,ResumenCaso,Detenidos,Arma, Vehiculo, Dinero,SustanciasIlegales} from '@/domain/models'
import {CreateDatosGenerales,CreateResumenCaso,CreateDetenido,CreateArmas,CreateVehiculos, CreateDinero,CreateSustanciasIlegales} from '@/domain/usecases'

export class AddReporteRegistroApoyoTecnico implements Controller {
    constructor(
        private readonly addRegistroApoyoTecnico: CreateDatosGenerales,
        private readonly addResumenCaso: CreateResumenCaso,
        private readonly addDetenido: CreateDetenido,
        private readonly addArmas: CreateArmas,
        private readonly addVehiculo: CreateVehiculos,
        private readonly addDinero: CreateDinero,
        private readonly addSustanciasIlegales: CreateSustanciasIlegales
    ){}

    async handle(request: AddReporteRegistroApoyoTecnico.Request): Promise<HttpResponse>  {
        try {
            // TODO: Schema General
            const datos = await this.addRegistroApoyoTecnico.create_datos_generales(request.DatosGenerales)

            const datos_resumen_caso = await this.addResumenCaso.create_resumen_caso(request.ResumenCaso)
            const created_detenido = await this.addDetenido.create_detenido(request.Detenido)
            const create_armas = await this.addArmas.create_armas(request.Armas) //Return ['asdasdasd','asdasdasd']
            const create_vehiculos = await this.addVehiculo.create_vehiculos(request.Vehiculos)
            const created_dinero = await this.addDinero.create_dinero(request.Dinero)
            const created_sustancias_Ilegales = await this.addSustanciasIlegales.create_sustancias_ilegales(request.SustanciasIlegales)
            console.log('Created Sustancias Ilegales =>',JSON.stringify(created_sustancias_Ilegales))

            // Proceso Add Ids De las Relaciones 
            

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
        Dinero: Dinero[],
        SustanciasIlegales: SustanciasIlegales[]
    }
}