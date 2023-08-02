import {UpdateUnidad} from '@/domain/usecases'
import {UpdateUnidad as updateUnidad} from '@/data/protocols'



export class DbUpdateUnidad implements UpdateUnidad {
    constructor(
        private readonly update_analista_ : updateUnidad
    ){}

    async update_unidad(data: UpdateUnidad.Params): Promise<void> {
        try {
            await this.update_analista_.update_unidad(data)
        } catch (error) {
            console.log(error)
        }
    }
}