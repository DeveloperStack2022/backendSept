import {GetAnalista} from '@/data/protocols'
import {Get_Analista} from '@/domain/usecases'

export class DbGetAnalista implements Get_Analista {

    constructor(
        private readonly getAnalista: GetAnalista
    ){}

    async get_analista(id_analista: Get_Analista.Params): Promise<Get_Analista.Result> {
        try {
            return await this.getAnalista.get_analista({id_analista:id_analista.id_analista})
        } catch (error) {
            return null
        }
    }

}