import {GetAnalistaByIdUnidad as GetAnalistaByIdUnidadData} from '@/data/protocols'
import {GetAnalistaByIdUnidad} from '@/domain/usecases'

export class DbGetAnalistaByIdUnidad implements GetAnalistaByIdUnidad {

    constructor(
        private readonly getAnalista: GetAnalistaByIdUnidadData
    ){}

    async get_analista_by_id_unidad(id_unidad: GetAnalistaByIdUnidad.Params): Promise<GetAnalistaByIdUnidad.Result> {
        return await this.getAnalista.get_analista_by_id_unidad(id_unidad)
    }

}