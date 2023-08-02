import {Analista,Unidad,Zona,Direcciones} from '@/domain/models'

import { Controller, HttpResponse } from "@/presentation/protocols";
import {CreateAnalista,GetAnalistaByNumCl,UpdateUnidad } from '@/domain/usecases'
import { noContent ,ok, serverError,forbidden} from '@/presentation/helpers';
import {NoReplyError} from '@/presentation/errors'



export class CreateAnalistaPresentationController implements Controller {
    constructor(
        private readonly createAnalista: CreateAnalista,
        private readonly getAnalistaByNum: GetAnalistaByNumCl,
        private readonly updateUnidad: UpdateUnidad
    ){}

    async handle(request: CreateAnalistaPresentationController.Request):Promise<HttpResponse> {
        try {
            const data = request
            const analista_existe = await this.getAnalistaByNum.search_analista_by_num_cl(data.Analista.numero_cedula)
            if(analista_existe){
                return forbidden(new NoReplyError('numero_cedula'))
            }
            
            const analista_created = await this.createAnalista.create_analista({Analista: data.Analista,Direcciones:data.Direcciones,Unidad: data.Unidad,Zona:data.Zona})
            console.log(analista_created.id_unidad)
            // Update Analista  -> id solo una Direccion - ids_zonas -> Array de Ids - nombre_unidad -> string
            await this.updateUnidad.update_unidad({
                id_direccion:analista_created.Direccion.id,
                id_zonas:analista_created.Zona.id,
                id:analista_created.id_unidad
            })
            
            return analista_created ? ok(analista_created) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace CreateAnalistaPresentationController {
    export type Request = {
        Analista:Analista,
        Direcciones: Direcciones,
        Zona:Zona,
        Unidad:Unidad
    }
}