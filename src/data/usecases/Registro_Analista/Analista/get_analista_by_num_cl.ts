import { GetAnalistaByNumCl } from "@/domain/usecases";
import {GetAnalistaByNumCl as getAnalistaByNumCl} from '@/data/protocols'

export class DbGetAnalistaByNumCl implements GetAnalistaByNumCl {
    constructor(
        private readonly get_analista_by_num_cl_: getAnalistaByNumCl
    ){}

    async search_analista_by_num_cl(numero_cedula: string): Promise<GetAnalistaByNumCl.Result> {
        const analista = await this.get_analista_by_num_cl_.get_analista_by_num_cl(numero_cedula)
        return analista
    }
}