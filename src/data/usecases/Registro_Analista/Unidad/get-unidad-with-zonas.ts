import {GetUnidadWithZona} from '@/domain/usecases'
import {GetUnidadWithZonas} from '@/data/protocols'

export class DbGetUnidadesWithZonas implements GetUnidadWithZona {
    constructor(
        private readonly get_unidad_with_zonas: GetUnidadWithZonas
    ){}

    async get_unidad_with_zona(id_unidad: string): Promise<GetUnidadWithZona.Result> {
        return await this.get_unidad_with_zonas.get_unidad_with_zonas(id_unidad)
    }
}