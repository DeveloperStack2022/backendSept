import { Controller, HttpResponse } from "@/presentation/protocols";
import {serverError,ok} from '@/presentation/helpers'

import {DatosGenerales,ResumenCaso,Detenidos,Arma, Vehiculo, Dinero,SustanciasIlegales} from '@/domain/models'
import {CreateDatosGenerales,CreateResumenCaso,CreateDetenido,CreateArmas,CreateVehiculos, CreateDinero,CreateSustanciasIlegales,UpdateDatosGenerales,CreateMuniciones} from '@/domain/usecases'

export class AddReporteRegistroApoyoTecnico implements Controller {
    constructor(
        private readonly addRegistroApoyoTecnico: CreateDatosGenerales,
        private readonly addResumenCaso: CreateResumenCaso,
        private readonly addDetenido: CreateDetenido,
        private readonly addArmas: CreateArmas,
        private readonly addVehiculo: CreateVehiculos,
        private readonly addDinero: CreateDinero,
        private readonly addSustanciasIlegales: CreateSustanciasIlegales,
        private readonly updateRegistroApoyoTecnico:UpdateDatosGenerales,
        private readonly addMuniciones: CreateMuniciones
    ){}
            
    async handle(request: any): Promise<HttpResponse>  {
        // console.log(request.imageAnexo)
        const request_data = JSON.parse(request.data)
      
              
        try {
            
            let ids_Docs:AddReporteRegistroApoyoTecnico.IDS = {}
            request_data.DatosGenerales.image_anexo = request.imageAnexo

            

            // TODO: Schema General
            const datos = await this.addRegistroApoyoTecnico.create_datos_generales(request_data.DatosGenerales)
            const datos_resumen_caso = await this.addResumenCaso.create_resumen_caso(request_data.ResumenCaso)
            
            ids_Docs = {
                ...ids_Docs,
                datosGenerales:datos,
                resumenCaso:datos_resumen_caso
            }
            
            if(request_data.detenidos.length > 0 ){
                const created_detenidos = await this.addDetenido.create_detenido(request_data.detenidos)
                ids_Docs = {
                    ...ids_Docs,
                    detenidos:created_detenidos
                }
            }
            if(request_data.armas.length > 0 ){
                const create_armas = await this.addArmas.create_armas(request_data.armas) //Return ['asdasdasd','asdasdasd']
                ids_Docs = {
                    ...ids_Docs,
                    armas:create_armas
                }
            }

            if(request_data.vehiculo.length > 0 ){
                const create_vehiculos = await this.addVehiculo.create_vehiculos(request_data.vehiculo)
                ids_Docs = {
                    ...ids_Docs,
                    vehiculo: create_vehiculos
                }
            }
            if(request_data.dinero.length > 0 ){
                const created_dinero = await this.addDinero.create_dinero(request_data.dinero)
                ids_Docs = {
                    ...ids_Docs,
                    dinero: created_dinero
                }

            }

            if(request_data.sustancias_sujetas_fiscalizacion.length  > 0) {
                // TODO: Transform Data 
                const transform = request_data.sustancias_sujetas_fiscalizacion.map(item => {
                    return {
                        ...item,
                        peso_kg: item.medida_peso == ('gr' || 'Gr') ? item.peso_neto / 1000 : parseInt(item.medida_peso)
                    }
                })
                const created_sustancias_Ilegales = await this.addSustanciasIlegales.create_sustancias_ilegales(transform)
                ids_Docs = {
                    ...ids_Docs,
                    sustancias_sujetas_fiscalizacion: created_sustancias_Ilegales
                }
            }
           
            if(request_data.municiones.length > 0 ){
                const ids_string = await this.addMuniciones.create_municiones(request_data.municiones)
                ids_Docs = {
                    ...ids_Docs,
                    municiones: ids_string
                }
            }
            
            await this.updateRegistroApoyoTecnico.update_datos_generales(ids_Docs)
           
            return ok({'data':'created'})
        } catch (error) {
            console.log(error)
            serverError(error)
        }
        // return ok({'data':'created'})
    }
}

export namespace AddReporteRegistroApoyoTecnico {
    export type Request = {
        data: {
            DatosGenerales:DatosGenerales,
            ResumenCaso:ResumenCaso
            detenidos: Detenidos[],
            armas: Arma[]
            vehiculo: Vehiculo[]
            dinero: Dinero[],
            sustancias_sujetas_fiscalizacion: SustanciasIlegales[]
        }
    }
    export type IDS = {
        datosGenerales?: string;
        resumenCaso?:string;
        detenidos?:string[]
        vehiculo?:string[]
        armas?:string[]
        dinero?:string[]
        municiones?:string[]
        sustancias_sujetas_fiscalizacion?:string[]
    }
}