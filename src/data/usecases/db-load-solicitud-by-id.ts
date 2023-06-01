import { SolicitudResult } from '@/domain/models'
import { LoadSolicitudById } from '@/domain/usecases'
// Data Protocols
import { LoadSolicitudByIdRepository } from '@/data/protocols'

export class DbLoadSolicitudById implements LoadSolicitudById {
  constructor (
    private readonly loadSolicitudByIdRespository: LoadSolicitudByIdRepository
  ) {}

  async loadById (idSolicitud: string): Promise<SolicitudResult> {
    return this.loadSolicitudByIdRespository.loadById(idSolicitud)
  }
}
