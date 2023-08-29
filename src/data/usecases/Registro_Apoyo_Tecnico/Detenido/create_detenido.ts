import { CreateDetenido } from "@/domain/usecases";
import {CreateDetenido as CreateDetenidoRepo} from '@/data/protocols'


export class DbCreateDetenido implements CreateDetenido {
    constructor(
        private readonly createDetenidoRepo: CreateDetenidoRepo
    ){}

    async create_detenido(params: CreateDetenido.Params): Promise<CreateDetenido.Result> {
        return await this.createDetenidoRepo.create_detenido(params)
    }
}