import {GetZonaById} from '@/domain/usecases'
import {GetZonaById as GetZonaDataProtocols} from '@/data/protocols'
export class DbGetZonaById implements GetZonaById {
    constructor(
        private readonly get_zona:GetZonaDataProtocols
    ){}

    async get_zona_by_id(id_zona: GetZonaDataProtocols.Params): Promise<GetZonaDataProtocols.Result> {
        return await this.get_zona.get_zona_by_id(id_zona)
    }
}