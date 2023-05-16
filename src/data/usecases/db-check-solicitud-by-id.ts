import { CheckSolicitudById } from '@/domain/usecases'
import { CheckSolicitudByIdRepository } from '@/data/protocols'

export class DbCheckSolicitudById implements CheckSolicitudById {
  constructor (
    private readonly checkSolicitudByIdRepository: CheckSolicitudByIdRepository
  ) {}

  async checkById (id: string): Promise<boolean> {
    return this.checkSolicitudByIdRepository.checkById(id)
  }
}
