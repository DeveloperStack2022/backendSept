import {UpdateDatosGenerales} from '@/domain/usecases'
import {UpdateDatosGenerales as updateDatosGenerales} from '@/data/protocols'

export class DbUpdateDatosGenerales implements UpdateDatosGenerales {
    constructor(
        private readonly updateDatosGenerales: updateDatosGenerales
    ){}

    async update_datos_generales(params: UpdateDatosGenerales.Params): Promise<UpdateDatosGenerales.Result> {
        return await this.updateDatosGenerales.update_datos_generales(params)
    }
}