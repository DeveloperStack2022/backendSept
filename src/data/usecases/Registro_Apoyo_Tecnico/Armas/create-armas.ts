import { CreateArmas } from "@/domain/usecases";
import {CreateArmas as CreateArmas_} from '@/data/protocols'


export class DbCreateArmas implements CreateArmas {
    constructor(
        private readonly createArmas: CreateArmas_
    ){}

    async create_armas(data: CreateArmas.Params[]): Promise<CreateArmas.Result> {
        return await this.createArmas.create_armas(data)
    }
}