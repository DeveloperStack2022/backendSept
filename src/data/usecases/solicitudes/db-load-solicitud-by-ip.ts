import {LoadSolicitudByIp} from '@/domain/usecases'
import {LoadSolicitudByIpRepository} from '@/data/protocols'

export class DbLoadsolicitudByIp implements LoadSolicitudByIp {

    // ID 
    constructor(
        private readonly loadSolicitudByIpRepository:LoadSolicitudByIpRepository
    ){}

    async load_solicitud_by_caso(request: LoadSolicitudByIp.Params): Promise<LoadSolicitudByIp.Result> {
        try {   
            return await this.loadSolicitudByIpRepository.load_solicitud_by_ip(request.ip)
        } catch (error) {
            return null
        }
    }
}   