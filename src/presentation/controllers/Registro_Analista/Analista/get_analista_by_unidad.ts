import { Controller, HttpResponse } from "@/presentation/protocols";
import {GetAnalistaByIdUnidad,GetUnidad} from '@/domain/usecases'
import {noContent,serverError,ok} from '@/presentation/helpers'

export class GetAnalistasByUnidad implements Controller  {
    constructor(
        private readonly getUnidadByNombre: GetUnidad,
        private readonly getAnalistaByUnidad: GetAnalistaByIdUnidad
    ){}

    async handle(request: GetAnalistaByUnidad.Request):Promise<HttpResponse> {
        try {
            const id_unidad = await this.getUnidadByNombre.get_unidad(request.nombre_unidad.toUpperCase())
            const analistas_by_unidad = await this.getAnalistaByUnidad.get_analista_by_id_unidad(id_unidad.id)
            
            /**
                type AnlistaResult {
                    id:String!
                    cedula:String!
                    nombres:String!
                    grado:String!
                    unidad:Unidad!
                    direccion:Direccion!
                    zona:Zona!
                }

                type Analistas {
                    analistas:[AnlistaResult!]
                }

                type Zona {
                    _id:String!
                    nombre_zona:Int!
                }

                type Direccion {
                    nombre_direccion:String!
                }

                type Unidad {
                    _id:String!
                    nombre_unidad:String!
                }
             */
            return analistas_by_unidad.length > 0 ? ok({analistas:analistas_by_unidad}) : noContent()
        } catch (error) {
            serverError(error)
        }
    }
}

export namespace GetAnalistaByUnidad {
    export type Request = {
        nombre_unidad:string;
    }
}