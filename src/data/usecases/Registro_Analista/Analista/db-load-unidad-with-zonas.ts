import {GetUnidadWithZonas} from '@/data/protocols'
import {GetUnidadWithZona} from '@/domain/usecases'

export class DbGetUnidadWithZonas implements GetUnidadWithZona {
    constructor (
        private readonly getUnidadWithZonas: GetUnidadWithZonas
    ){}

    async get_unidad_with_zona(id_unidad: string): Promise<GetUnidadWithZona.Result> {
        try {
            return await this.getUnidadWithZonas.get_unidad_with_zonas(id_unidad)
        } catch (error) {
            return null
        }
    }
}