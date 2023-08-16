import { CreateResumenCaso } from "@/domain/usecases";
import {CreateResumenCaso as CreateResumenCasoRepo} from '@/data/protocols'

export class DbCreateResumenCaso implements CreateResumenCaso {
    constructor(
        private readonly createResumenCasoRepo: CreateResumenCasoRepo
    ){}

    async create_resumen_caso(params: CreateResumenCaso.Params): Promise<any> {
        const datos_resumen_caso = await this.createResumenCasoRepo.create_resumen_caso(params)
        console.log(datos_resumen_caso)
    }
}