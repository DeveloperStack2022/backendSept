import { GetAnalistaByGrado } from "@/domain/usecases";
import {GetAnalistaByGrado as GetAnalistaByGrado_} from '@/data/protocols'

export class DbGetAnalistaByGrado implements GetAnalistaByGrado {
    constructor(
        private readonly getAnalistaByGrado: GetAnalistaByGrado_
    ){}

    async get_analista_by_grado(params: string): Promise<GetAnalistaByGrado.Result> {
        return await this.getAnalistaByGrado.get_analista_by_grado(params)
    }
}