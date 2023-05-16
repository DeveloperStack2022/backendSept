import { AddSolicitud } from '@/domain/usecases'
import { AddSolicitudRepository } from '@/data/protocols'
export class DbAddSolicitud implements AddSolicitud {
  constructor (
    private readonly addSolicitudRepository: AddSolicitudRepository
  ) {}

  async add (data: AddSolicitud.Params): Promise<void> {
    await this.addSolicitudRepository.add(data)
  }
}
