import { AddManySolicitud } from "@/domain/usecases";
import {AddSolicitudManyRepository} from '@/data/protocols'

export class DbAddManySolicitud implements AddManySolicitud {

    // Dependency Injection 
    constructor(
        private readonly addSolicitudRepository: AddSolicitudManyRepository
    ){}

    async addMany(data: AddManySolicitud.Params[]): Promise<void> {
        await this.addSolicitudRepository.addMany(data)
    }
}