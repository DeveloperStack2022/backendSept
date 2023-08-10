import {Get_analista_by_id} from '@/data/protocols'
import {Get_Analista_by_id} from '@/domain/usecases'

export class DbGetAnalistaById implements Get_Analista_by_id {

    constructor(
        private readonly getAnalista: Get_analista_by_id
    ){}

    async get_analista(id_analista: Get_Analista_by_id.Params): Promise<Get_Analista_by_id.Result> {
        try {
            return await this.getAnalista.get_analista_by_id(id_analista)
        } catch (error) {
            return null
        }
    }

}