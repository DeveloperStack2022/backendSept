import { Controller, HttpResponse } from "@/presentation/protocols";
import {serverError,ok} from '@/presentation/helpers'

import {DatosGenerales,ResumenCaso,Detenidos,Arma, Vehiculo, Dinero,SustanciasIlegales} from '@/domain/models'
import {CreateDatosGenerales,CreateResumenCaso,CreateDetenido,CreateArmas,CreateVehiculos, CreateDinero,CreateSustanciasIlegales,UpdateDatosGenerales} from '@/domain/usecases'

export class AddReporteRegistroApoyoTecnico implements Controller {
    constructor(
        private readonly addRegistroApoyoTecnico: CreateDatosGenerales,
        private readonly addResumenCaso: CreateResumenCaso,
        private readonly addDetenido: CreateDetenido,
        private readonly addArmas: CreateArmas,
        private readonly addVehiculo: CreateVehiculos,
        private readonly addDinero: CreateDinero,
        private readonly addSustanciasIlegales: CreateSustanciasIlegales,
        private readonly updateRegistroApoyoTecnico:UpdateDatosGenerales
    ){}
            
    async handle(request: AddReporteRegistroApoyoTecnico.Request): Promise<HttpResponse>  {
        try {
            
            let ids_Docs:AddReporteRegistroApoyoTecnico.IDS = {}

            // TODO: Schema General
            const datos = await this.addRegistroApoyoTecnico.create_datos_generales(request.DatosGenerales)
            const datos_resumen_caso = await this.addResumenCaso.create_resumen_caso(request.ResumenCaso)
            
            ids_Docs = {
                ...ids_Docs,
                datosGenerales:datos,
                resumenCaso:datos_resumen_caso
            }
            
            if(request.detenidos.length > 0 ){
                const created_detenidos = await this.addDetenido.create_detenido(request.detenidos)
                ids_Docs = {
                    ...ids_Docs,
                    detenidos:created_detenidos
                }
            }
            if(request.armas.length > 0 ){
                const create_armas = await this.addArmas.create_armas(request.armas) //Return ['asdasdasd','asdasdasd']
                ids_Docs = {
                    ...ids_Docs,
                    armas:create_armas
                }
            }

            if(request.vehiculo.length > 0 ){
                const create_vehiculos = await this.addVehiculo.create_vehiculos(request.vehiculo)
                ids_Docs = {
                    ...ids_Docs,
                    vehiculo: create_vehiculos
                }
            }
            if(request.dinero.length > 0 ){
                const created_dinero = await this.addDinero.create_dinero(request.dinero)
                ids_Docs = {
                    ...ids_Docs,
                    dinero: []
                }

            }
            if(request.sustancias_sujetas_fiscalizacion.length  > 0) {
                console.log(request.sustancias_sujetas_fiscalizacion)
                // TODO: Transform Data 
                const transform = request.sustancias_sujetas_fiscalizacion.map(item => {
                    return {
                        ...item,
                        peso_kg: item.medida_peso == ('gr' || 'Gr') ? item.peso_neto / 100 : item.medida_peso
                    }
                })
                const created_sustancias_Ilegales = await this.addSustanciasIlegales.create_sustancias_ilegales(transform)
                ids_Docs = {
                    ...ids_Docs,
                    sustancias_sujetas_fiscalizacion: []
                }
            }
            // console.log(ids_Docs)

            // Proceso Add Ids De las Relaciones 
            // Add New Ids 
            this.updateRegistroApoyoTecnico.update_datos_generales(ids_Docs)

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
        detenidos: Detenidos[],
        armas: Arma[]
        vehiculo: Vehiculo[]
        dinero: Dinero[],
        sustancias_sujetas_fiscalizacion: SustanciasIlegales[]
    }
    export type IDS = {
        datosGenerales?: string;
        resumenCaso?:string;
        detenidos?:string[]
        vehiculo?:string[]
        armas?:string[]
        dinero?:string[]
        sustancias_sujetas_fiscalizacion?:string[]
    }
}