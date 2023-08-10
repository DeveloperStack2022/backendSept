import {GetUnidad} from '@/domain/usecases'
import {SearchUnidad} from '@/data/protocols'

export class DbGetUnidadByNombre implements GetUnidad {
    constructor(
        private readonly get_unidad_: SearchUnidad
    ) {}

    async get_unidad(data: string): Promise<GetUnidad.Result> {
        try {
            return await this.get_unidad_.search_unidad({nombre_unidad:data})
        } catch (error) {
            
        }
    }
}