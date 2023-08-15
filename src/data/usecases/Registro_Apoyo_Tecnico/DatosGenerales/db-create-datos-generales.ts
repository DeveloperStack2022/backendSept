import {CreateDatosGenerales} from '@/domain/usecases'
import {CreateDatosGenerales as CreateDatosGeneralesRepo} from '@/data/protocols'

export class DbCreateDatosGenerales implements CreateDatosGenerales {
    constructor(
        private readonly createDatosGeneralesRepo:CreateDatosGeneralesRepo
    ){}

    async create_datos_generales(params: CreateDatosGenerales.Params): Promise<any> {
        const datos_generales = await this.createDatosGeneralesRepo.create_datos_generales(params)        
        console.log(datos_generales)
    }
}